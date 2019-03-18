// Project:	Aero - Responsive Bootstrap 4 Template
$(function () {
})

function openPopup (url, winname) {
  newwindow = window.open(url, winname)
  if (window.focus) { newwindow.focus() }
  return false
}
