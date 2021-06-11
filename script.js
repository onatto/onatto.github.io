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

function clickfs(ev) {
    var vid = ev.target
    playing[vid.idx] = true
    if (vid.paused) {
        vid.play();
    } else {
        if (!(document.fullscreenElement)) { 
            openFullscreen(vid); vid.play(); 
        }
        else { closeFullscreen(); }
    }
}

var playing = []
window.onload = function() {
    vids = document.getElementsByTagName('video');
    for(var i = 0; i < vids.length; i++) {
        var vid = vids[i];
        vid.idx = i;
        playing[i] = false

        vid.addEventListener('click', clickfs); 
    }

    nofs = document.getElementsByClassName('nofs');
    for(var i = 0; i < nofs.length; i++) {
        var vid = nofs[i];
        vid.removeEventListener('click', clickfs); 
        vid.addEventListener('click', function(ev) {
            if (ev.target.paused){
                ev.target.play();
            }
            else {
                ev.target.pause();
            }
        });
    }

    document.addEventListener('scroll', function(e) {
        window.requestAnimationFrame(function() {
            if (!(document.fullscreenElement)) { 
                for(var i = 0; i < vids.length; i++) {
                    var vid = vids[i];
                    if (playing[vid.idx]) {
                        if (!elemInView(vid)) {
                            vid.pause(); 
                        }
                        else {
                            vid.play(); 
                        }
                    }
                }
            }
        });
    });

}
