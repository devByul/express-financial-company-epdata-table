const tmp = {
  model: {
    "303": [
      {
        MODL_C_NO: "1901",
        MODL_C_NM: "포터2"
      },
      {
        MODL_C_NO: "3297",
        MODL_C_NM: "쏠라티"
      },
      {
        MODL_C_NO: "3564",
        MODL_C_NM: "넥쏘"
      },
      {
        MODL_C_NO: "3652",
        MODL_C_NM: "쏘나타"
      },
      {
        MODL_C_NO: "3654",
        MODL_C_NM: "베뉴"
      },
      {
        MODL_C_NO: "3820",
        MODL_C_NM: "투싼"
      },
      {
        MODL_C_NO: "3853",
        MODL_C_NM: "싼타페"
      },
      {
        MODL_C_NO: "4013",
        MODL_C_NM: "아이오닉 5"
      },
      {
        MODL_C_NO: "4014",
        MODL_C_NM: "스타리아"
      },
      {
        MODL_C_NO: "4078",
        MODL_C_NM: "아반떼 N"
      },
      {
        MODL_C_NO: "4086",
        MODL_C_NM: "캐스퍼"
      }
    ]
  }
};

console.log(tmp.model[303].find(e => e.MODL_C_NO === "4086")?.MODL_C_NM);
