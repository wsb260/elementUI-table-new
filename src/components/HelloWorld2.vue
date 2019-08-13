<template>
  <div class="hello">
    <el-button type="primary" @click="addCol()" class="addBtn">添加行</el-button>
    <el-button type="primary" @click="delCol()" class="addBtn">删除行</el-button>
    <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column type="index" label="序号"  width="50" :align="align"></el-table-column>
      <el-table-column prop="flag" label="标识" width="50" :align="align">
        <template slot-scope="scope">
          <i v-if="scope.row.flag === 'del'" class="el-icon-delete"></i>
          <i v-else-if="scope.row.flag === 'add'" class="el-icon-circle-plus"></i>
          <i v-else></i>
        </template>
      </el-table-column>
      <template v-for="(col,index) in cols">
        <!-- 输入框 -->
        <template v-if="col.type ==='input'">
          <el-table-column :key="index" :prop="col.prop" :label="col.label" :sortable="col.sortable?col.sortable:''" :align="align">
            <template slot-scope="scope">
              <!-- 原始值 -->
              <template v-if="scope.row['_'+col.prop]">
                <span class="save-span">{{tableData[scope.$index]['_'+col.prop]}}</span>
              </template>
              <!-- 编辑状态下显示input框 -->
              <el-input
                v-if="scope.row.isSet"
                maxlength="20"
                show-word-limit
                placeholder="请输入内容"
                v-model="tableData[scope.$index][col.prop]"
                @focus="edit(col.prop,scope.row[col.prop],scope.$index,$event)"
              />
              <!-- 非编辑状态下显示文本框 -->
              <span v-if="!scope.row.isSet">{{scope.row[col.prop]}}</span>
            </template>
          </el-table-column>
        </template>
        <!-- 下拉框 -->
        <template v-else-if="col.type === 'sel'">
          <el-table-column :key="index" :prop="col.prop" :label="col.label" :sortable="col.sortable?col.sortable:''" :align="align">
            <template slot-scope="scope">
              <!-- 原始值 -->
              <template v-if="scope.row['_'+col.prop]">
                <span
                  class="save-span"
                >{{selFormatter(tableData[scope.$index]['_'+col.prop]['options'],tableData[scope.$index]['_'+col.prop]['value'])}}</span>
              </template>
              <!-- 编辑状态下显示下拉框 -->
              <template v-if="scope.row.isSet">
                <el-select
                  v-if="scope.row[col.prop]"
                  v-model="scope.row[col.prop]['value']"
                  @focus="selFocus(col.prop,scope.row[col.prop],scope.$index)"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="selPart in scope.row[col.prop]['options']"
                    :key="selPart.EAF_ID"
                    :label="selPart.EAF_NAME"
                    :value="selPart.EAF_ID"
                  ></el-option>
                </el-select>
              </template>
              <!-- 非编辑状态下显示文本框 -->
              <template v-if="!scope.row.isSet">
                <span
                  v-if="scope.row[col.prop]"
                >{{selFormatter(scope.row[col.prop]['options'],scope.row[col.prop]['value'])}}</span>
              </template>
            </template>
          </el-table-column>
        </template>
        <!-- 日期框 -->
        <template v-else-if="col.type === 'date'">
          <el-table-column :key="index" :prop="col.prop" :label="col.label" :sortable="col.sortable?col.sortable:''" :align="align" width="240">
            <template slot-scope="scope">
              <!-- 原始值 -->
              <template v-if="scope.row['_'+col.prop]">
                <span class="save-span">{{tableData[scope.$index]['_'+col.prop]}}</span>
              </template>
              <!-- 编辑状态下显示日期框 -->
              <el-date-picker
                v-if="scope.row.isSet"
                v-model="tableData[scope.$index][col.prop]"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
                @focus="dateChange(col.prop,scope.row[col.prop],scope.$index)"
              ></el-date-picker>
              <!-- 非编辑状态下显示文本框 -->
              <span v-if="!scope.row.isSet">{{scope.row[col.prop]}}</span>
            </template>
          </el-table-column>
        </template>
        <!-- 非控件类型 -->
        <template v-else>
          <el-table-column :key="index" :prop="col.prop" :label="col.label" :sortable="col.sortable?col.sortable:''" :align="align"></el-table-column>
        </template>
      </template>
      <el-table-column label="操作" :align="align">
        <template slot-scope="scope">
          <template v-if="scope.row.flag !== 'del'">
            <el-button size="mini" type="danger" @click="delleteRow(scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="changeNum(scope.row)"
            >{{scope.row.isSet?'保存':'修改'}}</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props:{
    align:{
      default:'center',
      type:String
    }
  },
  data() {
    return {
      len: 4,
      tableData: [
        {
          EAF_ID:1,
          date: "2016-05-02 00:11:00",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          flag: "del"
        },
        {
          EAF_ID:2,
          date: "2016-05-04 00:22:00",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          flag: "del"
        },
        {
          EAF_ID:3,
          date: "2016-05-01 00:33:09",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          select: {
            // 下拉框的当前值
            value: "选项1",
            options: [
              {
                // 下拉框的所有值
                EAF_ID: "选项1",
                EAF_NAME: "黄金糕"
              },
              {
                EAF_ID: "选项2",
                EAF_NAME: "双皮奶"
              },
              {
                EAF_ID: "选项3",
                EAF_NAME: "蚵仔煎"
              },
              {
                EAF_ID: "选项4",
                EAF_NAME: "龙须面"
              },
              {
                EAF_ID: "选项5",
                EAF_NAME: "北京烤鸭"
              }
            ]
          }
        },
        {
          EAF_ID:4,
          date: "2016-05-01 00:00:00",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ],
      cols: [
        { prop: "date", label: "日期", type: "date",sortable: 'sortable' },
        { prop: "name", label: "姓名", type: "input" },
        { prop: "address", label: "地址", type: "text" },
        { prop: "select", label: "选项", type: "sel" }
      ],
      multipleSelection:[]
    };
  },
  methods: {
    // 删除线
    delleteRow(row) {
      if (row.isSet) {
        alert("有未保存的内容，请先保存！");
        return false;
      }
      this.$set(row, "flag", "del");
    },
    // 添加行
    addCol() {
      this.tableData.push({
        EAF_ID:5,
        date: "2016-05-03 00:00:00",
        name: "hhahahah",
        address: "上海市普陀区金沙江路 1516 弄",
        flag: "add"
      });
    },
    delCol(){
      this.tableData.forEach(item=>{
        if(item.isSet){
          alert("有未保存的数据,请先保存再进行操作!")
          return false
        }
        this.multipleSelection.forEach(cont=>{
          if(item.EAF_ID === cont.EAF_ID){
            this.$set(item,'flag','del')
          }
        })
      })
    },
    // 编辑
    edit(oldVal, name, index) {
      let $key = "_" + oldVal;
      if (this.tableData[index].hasOwnProperty($key)) {
        return false;
      } else {
        this.tableData[index][$key] = name;
      }
    },
    leave(oldVal, index) {
      let $key = "_" + oldVal;
      if (this.tableData[index].hasOwnProperty($key)) {
        // event.target.parentElement.previousElementSibling.style.display =
        //   "block";
      }
    },
    // 退出编辑状态之后用文本框显示
    changeNum(row) {
      if (row.isSet) {
        this.$set(row, "isSet", false);
      } else {
        this.$set(row, "isSet", true);
      }
    },
    // 下拉框格式化
    selFormatter(row, key) {
      // row下拉框所有值，key当前要显示的值的value
      let val = "";
      row.map((value) => {
        if (value["EAF_ID"] === key) {
          val = value["EAF_NAME"];
        }
      });
      return val;
    },
    // 下拉框获得焦点
    selFocus(oldVal, name, index) {
      let $key = "_" + oldVal;
      if (this.tableData[index][$key]) {
        return false;
      } else {
        this.tableData[index][$key] = {
          value: name.value,
          options: name.options.slice()
        };
      }
    },
    // 日期框
    dateChange(oldVal, name, index){
      let $key = "_" + oldVal;
      if (this.tableData[index].hasOwnProperty($key)) {
        return false;
      } else {
        this.tableData[index][$key] = name;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
.el-icon-circle-plus {
  color: red;
}
.addBtn {
  float: left;
}
.save-span {
  color: gray;
  text-decoration: line-through;
  display: block;
}

/deep/ .addline {
  position: relative !important;
}
/deep/ .el-table_row .addline::after {
  content: "";
  position: absolute;
  height: 3px;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  text-decoration: line-through;
  color: graytext;
  background: blue;
}
</style>
