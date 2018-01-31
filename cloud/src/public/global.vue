<script type="text/javascript">
const _url = 'http://zdpzs9.natappfree.cc'; 
const formatDuring = function(mss) { //播放时间转成分秒
      var result = "";
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (mss % (1000 * 60)) / 1000;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds.toFixed(0);
      } else {
        seconds = seconds.toFixed(0);
      }
      result = minutes + ":" + seconds;
      return result;
    };
    // 将整数转换成 时：分：秒的格式
const realFormatSecond = function (second) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return  ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '0:00'
  }
}
// const _url = 'http://127.0.0.1:3000'; 
export default
{
 _url,
 formatDuring,
 realFormatSecond
}
</script>