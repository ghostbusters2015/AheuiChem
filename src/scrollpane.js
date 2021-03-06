function ScrollPane(viewport, clickCallback) {
  this.viewport = viewport;
  this.clickCallback = clickCallback;
  this.registerEvents();
  this.tolerance = 6;
}

ScrollPane.prototype.registerEvents = function() {
  var self = this;
  var prevX = 0;
  var prevY = 0;
  var moveX = 0;
  var moveY = 0;
  function handleMouseUp(e) {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
    if (Math.abs(moveX) < self.tolerance && Math.abs(moveY) < self.tolerance
      && self.clickCallback) {
      self.clickCallback(e);
    }
    return false;
  }
  function handleMouseMove(e) {
    var diffX = e.pageX - prevX;
    var diffY = e.pageY - prevY;
    self.viewport.scrollTop -= diffY;
    self.viewport.scrollLeft -= diffX;
    moveX -= diffX;
    moveY -= diffY;
    prevX = e.pageX;
    prevY = e.pageY;
  }
  this.viewport.addEventListener('mousedown', function(e) {
    prevX = e.pageX;
    prevY = e.pageY;
    moveX = 0;
    moveY = 0;
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    e.preventDefault();
    return false;
  });
}

module.exports = ScrollPane;
