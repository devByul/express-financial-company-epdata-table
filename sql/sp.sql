##############################################################################################################################
## 차량 검색 메뉴 
CREATE PROCEDURE `danawa`.`spGetCarSelectItemAll`()
BEGIN
	-- 
	SELECT DISTINCT 
		concat(BRN_C_NO) as idx
		, BRN_C_NO
		, BRN_C_NM
	FROM danawa.danawa_car_db
	ORDER BY idx;
	
	-- 
	SELECT DISTINCT 
		concat(BRN_C_NO) as idx
		, MODL_C_NO 
		, MODL_C_NM
	FROM danawa.danawa_car_db
	ORDER BY idx;

	-- 
	SELECT DISTINCT 
		concat(BRN_C_NO, MODL_C_NO) as idx
		, TRIM_C_NO 
		, TRIM_C_NM
	FROM danawa.danawa_car_db
	ORDER BY idx;
	
	-- 
	SELECT DISTINCT 
		concat(BRN_C_NO, MODL_C_NO, TRIM_C_NO) as idx
		, DTL_TRIM_C_NO 
		, DTL_TRIM_C_NM
	FROM danawa.danawa_car_db
	ORDER BY idx;
END
##############################################################################################################################
## 금융사별 금액비교 테이블 데이터
CREATE PROCEDURE `danawa`.`spGetComparisonCapitalData`(
	### 차량검색
	  IN in_brn_c_no_int 		INT			-- * 차 브랜드 코드넘버
	, IN in_modl_c_no_int 		INT			-- 차 모델명 코드넘버
	, IN in_trim_c_no_int 		INT			-- 차 트림 코드넘버
	, IN in_dtl_trim_c_no_int 	INT			-- 차 상세트림 코드넘버
	### 조건
	, IN in_prodType_char		CHAR(1)		-- 금융상품 타입 (L-리스 / R- 렌트 / I - 할부)
	, IN in_period_c_no_int		INT			-- 할부기간 (36,48,60)
	, IN in_jogun_int			INT			-- 조건 (1: 보증0/선납0  2: 보증0/선납30   3: 보증30/선납0)
)
    COMMENT '\n	차량 상세트림 번호를 이용하여 조건에 해당하는 캐피탈별 금액비교 테이블 도출	\n 
        추가 설명
            필수 IN 데이터는 브랜드 코드, 금융 상품 타입, 할부기간, 조건 이 4가지는 반드시 넣어야 합니다.
        예시 sql
            CALL spGetComparisonCapitalData('303','4190','49755','79297','R','36','1');
        예시 데이터
        [
            {
                "idx": "30341904975579297",
                "BRN_C_NO": 303,
                "brnNm": "현대",
                "carNm": "팰리세이드 2022년형 가솔린 3.8 2WD(개별소비세 3.5% 적용) 캘리그래피 (8인승)",
                "prodType": "R",
                "period": 36,
                "jogun": 1,
                "CDwr001": "-",
                "CPlt001": "983950,30461700,0.6",
                "CPmr001": "1033890,30978000,0.61",
                "CDsh001": "1019260,31504000,0.62",
                "CPnh001": "991000,32010600,0.63",
                "CPor001": "1018490,30411000,0.6",
                "CPhs001": "1154340,26331300,0.52",
                "RTjo001": "1184400,29429100,0.58",
                "CPdg001": "1007820,32011000,0.63",
                "CPkd001": "-",
                "CPhk001": "-",
                "CPbn001": "-",
                "CDsh002": "-"
            }
        ]    
    '
BEGIN
########################################
####		차량 IDX 값 저장			####
########################################
create temporary table IF NOT EXISTS tmpCapitalTableIdx(
	idx TEXT
);

INSERT INTO tmpCapitalTableIdx (
	idx
) 
	SELECT 
		CONCAT(de.BRN_C_NO, de.MODL_C_NO, de.TRIM_C_NO, de.DTL_TRIM_C_NO) as idx
	from danawa_epdata de
	where 	 
		de.BRN_C_NO = Coalesce(in_brn_c_no_int, de.BRN_C_NO) AND
		de.MODL_C_NO = Coalesce(in_modl_c_no_int, de.MODL_C_NO) AND
		de.TRIM_C_NO = Coalesce(in_trim_c_no_int, de.TRIM_C_NO) AND
		de.DTL_TRIM_C_NO = Coalesce(in_dtl_trim_c_no_int, de.DTL_TRIM_C_NO)
	group by 
		  de.BRN_C_NO
		, de.MODL_C_NO
		, de.TRIM_C_NO
		, de.DTL_TRIM_C_NO
	order by 
		  de.BRN_C_NO
		, de.MODL_C_NO ASC
		, de.TRIM_C_NO ASC
		, de.DTL_TRIM_C_NO ASC;

########################################
####		조건에 해당하는 SELECT		####
########################################	
create temporary table IF NOT EXISTS tmpCapitalTableRowData(
    BRN_C_NO            INT
	, idx               TEXT
	, BRN_C_NM          VARCHAR(50)
	, carNm             TEXT
	, DTL_TRIM_C_NO     INT
	, corpCode          TEXT
	, corpName          TEXT
	, prodType          CHAR(1)
	, period            INT
	, jogun             INT
	, amount            TEXT
);

INSERT INTO tmpCapitalTableRowData(
	BRN_C_NO        
	, idx           
	, BRN_C_NM      
	, carNm         
	, DTL_TRIM_C_NO 
	, corpCode      
	, corpName      
	, prodType      
	, period        
	, jogun         
	, amount        
) 
	SELECT
		de.BRN_C_NO 
		, concat(de.BRN_C_NO, de.MODL_C_NO, de.TRIM_C_NO, de.DTL_TRIM_C_NO) as idx
		, de.BRN_C_NM
		, concat(de.MODL_C_NM, ' ', de.TRIM_C_NM, ' ', de.DTL_TRIM_C_NM) as carNm
		, de.DTL_TRIM_C_NO 
		, de.corpCode 
		, de.corpName 
		, de.prodType
		, de.period
		, de.jogun
		, concat(de.payment,',',de.residualAmount,',',(round((de.residualAmount / dcd.PRICE), 2))) as amount
	from danawa_epdata de
		left join danawa_car_db dcd on dcd.DTL_TRIM_C_NO = de.DTL_TRIM_C_NO 
	where 
		de.DTL_TRIM_C_NO in (select right(idx,5) from tmpCapitalTableIdx)
		and de.prodType = in_prodType_char
		and de.period = in_period_c_no_int
		and de.jogun = in_jogun_int
	order by 
		de.BRN_C_NO
		, de.MODL_C_NO DESC
		, de.TRIM_C_NO DESC 
		, de.DTL_TRIM_C_NO DESC
		, field(corpCode, "CDwr001", "CPlt001", "CPmr001", "CDsh001", "CPnh001", "CPor001", "CPhs001", "RTjo001", "CPdg001", "CPkd001", "CPhk001", "CPbn001", "CDsh002");

########################################
####						####	
########################################
select 
	rd.idx
	, rd.BRN_C_NO
	, rd.BRN_C_NM as brnNm
	, rd.carNm
	, rd.prodType
	, rd.period
	, rd.jogun
	, MAX(IF(corpCode = 'CDwr001', amount, '-')) AS CDwr001
	, MAX(IF(corpCode = 'CPlt001', amount, '-')) AS CPlt001
	, MAX(IF(corpCode = 'CPmr001', amount, '-')) AS CPmr001
	, MAX(IF(corpCode = 'CDsh001', amount, '-')) AS CDsh001
	, MAX(IF(corpCode = 'CPnh001', amount, '-')) AS CPnh001
	, MAX(IF(corpCode = 'CPor001', amount, '-')) AS CPor001
	, MAX(IF(corpCode = 'CPhs001', amount, '-')) AS CPhs001
	, MAX(IF(corpCode = 'RTjo001', amount, '-')) AS RTjo001
	, MAX(IF(corpCode = 'CPdg001', amount, '-')) AS CPdg001
	, MAX(IF(corpCode = 'CPkd001', amount, '-')) AS CPkd001
	, MAX(IF(corpCode = 'CPhk001', amount, '-')) AS CPhk001
	, MAX(IF(corpCode = 'CPbn001', amount, '-')) AS CPbn001
	, MAX(IF(corpCode = 'CDsh002', amount, '-')) AS CDsh002
from 
	tmpCapitalTableRowData rd
group by 
	rd.idx
	, rd.BRN_C_NO
	, rd.BRN_C_NM
	, rd.carNm
	, rd.prodType
	, rd.period
	, rd.jogun
;


########################################
####			임시테이블 삭제			####	
########################################
drop table 
	tmpCapitalTableIdx
	, tmpCapitalTableRowData
	;
END