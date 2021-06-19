var CommonFn = CommonFn || {};

CommonFn.convertDate = dateSrc => {
    if (dateSrc == null) return;
    let date = new Date(dateSrc),
      year = date.getFullYear().toString(),
      month = (date.getMonth() + 1).toString().padStart(2, "0"),
      day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
}

