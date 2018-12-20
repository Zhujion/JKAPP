<template>
  <table border="0">
    <tr>
      <td>护士唯一标识符</td>
      <td colspan="5">{{datalist.baseguid}}</td>
      <td>是否在黑名单</td>
      <td v-if="datalist.black>1">未知</td>
      <td v-if="datalist.black===0">在</td>
      <td v-if="datalist.black===1">否</td>
    </tr>
    <tr>
      <td>姓名</td>
      <td>{{datalist.basename}}</td>
      <td>性别</td>
      <td>{{datalist.basesex}}</td>
      <td>国籍</td>
      <td>{{datalist.basecountry}}</td>
      <td>出生年月</td>
      <td>{{datalist.basecsrq}}</td>
    </tr>
    <tr>
      <td>证件类型</td>
      <td  colspan="3">{{datalist.cardtype}}</td>
      <td>证件号</td>
      <td colspan="3">{{datalist.baseidcard}}</td>
    </tr>
    <tr>
      <td>执业地点标识符</td>
      <td colspan="3">{{datalist.basewordaddrid}}</td>
      <td>执业地点名称</td>
      <td colspan="3">{{datalist.basewordidcode }}</td>
    </tr>
    <tr>
      <td>执业证书编码</td>
      <td colspan="3">{{datalist.basewordidcode}}</td>
      <td>注册业务名称</td>
      <td colspan="3">{{datalist.baseregsubject_name}}</td>
    </tr>
    <tr>
      <td>注册批准日期</td>
      <td colspan="3">{{datalist.basepassdate}}</td>
      <td>注册有效期至</td>
      <td colspan="3">{{datalist.basevaliddate}}</td>
    </tr>
    <tr>
      <td>注册审批机关标识符</td>
      <td colspan="3">{{datalist.baseregid}}</td>
      <td>注册审批机关名称</td>
      <td colspan="3">{{datalist.baseregname}}</td>
    </tr>
    <tr>
      <td>多执业机构备案执业地点名称</td>
      <td colspan="3">{{datalist.nameofpracticeplace}}</td>
      <td>多执业机构备案机构名称</td>
      <td colspan="3">{{datalist.nameoforganizationfiling}}</td>
    </tr>
    <tr>
      <td>多执业机构备案开始日期</td>
      <td colspan="3">{{datalist.recordedstartingdate}}</td>
      <td>多执业机构备案结束日期</td>
      <td colspan="3">{{datalist.recodedenddate}}</td>
    </tr>
    <tr>
      <td>多执业机构备案审批机关标识符</td>
      <td colspan="3">{{datalist.registeredagencyIdentifier}}</td>
      <td> 多执业机构备案审批机关名称</td>
      <td colspan="3">{{datalist.approvalauthority}}</td>
    </tr>
    <tr>
      <td>多执业机构备案批准日期</td>
      <td colspan="3">{{datalist.approvaldate}}</td>
      <td> 省份代码</td>
      <td>{{datalist.provincecode}}</td>
      <td> 省份名称</td>
      <td>{{datalist.province}}</td>
    </tr>
    <tr style="height: 200px">
      <td>证书</td>
      <td colspan="7">{{datalist.certificate}}</td>
    </tr>
    <tr>
      <td>私钥</td>
      <td colspan="7">{{datalist.private}}</td>
    </tr>
    <tr>
      <td>图片地址</td>
      <td colspan="7">{{datalist.ImageInformation}}</td>
    </tr>
  </table>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  props: ['datalist'],
  created () {
  }
}
</script>

<style scoped>
  table,table tr th, table tr td { border:1px solid #E5E5E5; word-wrap:break-word;}
  table { width: 800px; min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse;margin:0 auto;table-layout:fixed;}
</style>
