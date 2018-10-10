const select = new mdc.select.MDCSelect(document.querySelector(".mdc-select"));
select.listen("change", () => {
  alert(
    `Selected option at index ${select.selectedIndex} with value "${
      select.value
    }"`
  );
});
