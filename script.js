/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

var vids = 0
// Where el is the DOM element you'd like to test for visibility
function elemInView(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}
window.onload = function() {
    vids = document.getElementsByTagName('video');
    for(var i = 0; i < vids.length; i++) {
        var vid = vids[i];
        vid.addEventListener('ended', function(ev) {
            if (document.fullscreenElement == ev.target) { ev.target.play(); }
            if (elemInView(ev.target)) {
                ev.target.play();
            }
        });

        vid.addEventListener('click', function(ev) {
            if (!(document.fullscreenElement)) { 
                openFullscreen(ev.target); ev.target.play(); 
            }
            else { closeFullscreen(); }
        });
    }
}
