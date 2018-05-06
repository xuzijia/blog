UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
UE.Editor.prototype.getActionUrl = function(action) {
    if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage' || action=='catchimage') {
        return '/admin/blog/uploadThumbPic.do?type=ueditor';
    } else if (action == 'uploadvideo' || action=='uploadfile') {
        return '/admin/blog/uploadThumbPic.do?type=ueditor';
    } else {
        return this._bkGetActionUrl.call(this, action);
    }
}