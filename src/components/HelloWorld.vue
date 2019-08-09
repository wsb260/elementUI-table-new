<template>
  <div class="info">
    <el-table
      :data="tableData"
      class="tb-edit"
      style="width: 100%"
      highlight-current-row
      @cell-dblclick = handleCellClick
    >
      <el-table-column label="日期" width="180">
        <template scope="scope">
          <el-input size="small"  v-model="scope.row.date" placeholder="请输入内容"></el-input>
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="180">
        <template scope="scope">
          
          <template v-if="scope.row.show">
            <el-input
                size="small"
                v-model="scope.row.name"
                placeholder="请输入内容"
                @focus="handleInputFocus(scope.row,scope.row.name,$event)"
                @blur="handleInputBlur(scope.row,scope.row.name,$event)"
                @chang="handleInputChange(scope.row,scope.row.name,$event)"
              ></el-input>
              <span>{{scope.row.name}}</span>
          </template>
          <template v-else>
             <el-input
                size="small"
                v-model="scope.row.name"
                placeholder="请输入内容"
                @focus="handleInputFocus(scope.row,scope.row.name,$event)"
                @blur="handleInputBlur(scope.row,scope.row.name,$event)"
                @chang="handleInputChange(scope.row,scope.row.name,$event)"
              ></el-input>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址">
        <template scope="scope">
          <el-input size="small" v-model="scope.row.address" placeholder="请输入内容"></el-input>
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          edit: false,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          edit: true,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          edit: false,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          edit: false,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    //单元格点击后，显示input，并让input 获取焦点
    handleCellClick: function(row, column,cell, event) {
      //cell.classList.add('current-cell') // 增加class让输入框显示
      //cell.getElementsByTagName('input')[0].focus() // input框设置焦点
      let prop = column.property; // 当前列属性名
      let targetName = event.target.innerText; // 当前单元格的值
      row[prop + "text"] = targetName; // 给当前行
      // console.log(this.$set(row,row[prop+'text'],targetName))
      // emptransfer.addClass(cell, "current-cell");
      // if (emptransfer.getChildElement(cell, 3) !== 0) {
      //   var _inputParentNode = emptransfer.getChildElement(cell, 3);
      //   if (
      //     _inputParentNode.hasChildNodes() &&
      //     _inputParentNode.childNodes.length > 2
      //   ) {
      //     var _inputNode = _inputParentNode.childNodes[2];
      //     if (_inputNode.tagName === "INPUT") {
      //       _inputNode.focus();
      //     }
      //   }
      // }
    },
    //input框失去焦点事件
    handleInputBlur: function(row, column, event) {
      debugger
       row.show = true
      //console.log(event.target.parentElement.offsetParent.classList.remove('current-cell'))
            // console.log(this.tableData);

      //当 input 失去焦点 时,input 切换为 span，并且让下方 表格消失（注意，与点击表格事件的执行顺序）
      // var _event = event;
      // setTimeout(function() {
      //   var _inputNode = _event.target;
      //   if (emptransfer.getParentElement(_inputNode, 4) !== 0) {
      //     var _cellNode = emptransfer.getParentElement(_inputNode, 4);
      //     emptransfer.removeClass(_cellNode, "current-cell");
      //     emptransfer.removeClass(_cellNode, "current-cell2");
      //   }
      // }, 200);
    },
    handleInputFocus: function(row, column, event) {
      row.show = false
    },
    handleInputChange:function(row, column, event){
      let prop = column;
      let targetName = event.target.value;
      row[prop + "text"] = targetName;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
.tb-edit .el-input {
  display: block;
}
.tb-edit .el-input {
  display: block;
}
/* .tb-edit .el-input + span {
  color: #9e9e9e;
  text-decoration: line-through;
} */
</style>
