Page({

  /**
   * 页面的初始数据
   */
  data: {
    connectState: '暂无状态'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.connectSocket();
    this.connetErrorListener();
    this.connectListenerAndSendDataWhenSuccess();
    this.connectDataTransfer();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  connectSocket: function () {
    this.setData({
      connectState: "正在连接。如正在连接状态长时间不改变，则可能为连接失败"
    });
    wx.connectSocket({
      url: '127.0.0.1:8001'
    });
  },

  connectListenerAndSendDataWhenSuccess: function () {
    wx.onSocketOpen(function () {
      this.setData({
        connectState: "连接成功"
      });
      sendSocketMessage(new Date());
    });
  },

  connectDataTransfer: function () {
    var that = this;
    wx.onSocketMessage(function (data) {
      var objData = JSON.parse(data.data);
      that.setData({
        connectState: data
      });
    });
  },

  connetErrorListener: function () {
    var that = this;
    wx.onSocketError(function (res) {
      const errMsg = '连接失败，失败信息如下(如为空则无失败信息返回)：' + res.errMsg;
      that.setData({
        connectState: errMsg
      });
    });
  }
})