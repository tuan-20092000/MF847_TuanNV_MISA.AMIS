<template>
  <div
    class="main"
    @keyup.up.exact="arrowUp()"
    @keyup.down.exact="arrowDown()"
    @keydown.ctrl.192.exact="addEmployee()"
    @keydown.delete.exact="showWarning()"
    @click="clickMain($event)"
  >
    <div class="main-title">
      <div class="main-title-content">
        <div class="title">Nhân viên</div>
        <div class="main-title-btn">
          <button class="btn-more">
            <span style="padding-right:4px;">Tiện ích</span
            ><img src="../Resource/img/drop_down.svg" alt="" />
          </button>
          <button v-on:click="addEmployee()" class="btn-add"><span>Thêm</span></button>
          <button class="btn-excel">
            <div class="div-img-drop-down">
              <img src="../Resource/img/drop_down_white.svg" alt="" />
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="layout">
      <div class="grid">
        <div class="excution">
          <span>Thực hiện hàng loạt</span>
          <img src="../Resource/img/drop_down.svg" alt="" />
        </div>
        <div class="right-control">
          <div class="search-name-id">
            <input
              id="search-name-id"
              v-model="keySearch"
              ref="input"
              type="text"
              v-on:keyup.enter="searchKeyWord()"
              @keydown.tab.prevent.stop="edit()"
              placeholder="Tìm theo mã, tên nhân viên"
              autofocus
              autocomplete="off"
            />
            <img src="../Resource/img/find.svg" alt="search" />
          </div>
          <div class="three-btn">
            <img
              v-on:click="refresh()"
              src="../Resource/img/refresh.svg"
              alt=""
            />
            <img src="../Resource/img/excel.svg" alt="" />
            <img src="../Resource/img/setting.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="" id="ms-component-table">
        <div class="wrap-table" id="wrap_table">
          <div class="ms-table">
            <table>
              <caption></caption>
              <thead>
                <tr>
                  <th id="" class="out-left-white bgc-white"></th>
                  <th style="left: 16px" class="check-all" id="check-all">
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th style="min-width: 150px; width: 150px" id="">
                    MÃ NHÂN VIÊN
                  </th>
                  <th style="min-width: 250px; width: 250px" id="">
                    TÊN NHÂN VIÊN
                  </th>
                  <th style="min-width: 120px; width: 120px" id="">
                    GIỚI TÍNH
                  </th>
                  <th style="min-width: 150px; width: 150px" id="">
                    NGÀY SINH
                  </th>
                  <th style="min-width: 200px; width: 200px" id="">SỐ CMND</th>
                  <th style="min-width: 250px; width: 250px" id="">
                    CHỨC DANH
                  </th>
                  <th style="min-width: 250px; width: 250px" id="">
                    TÊN ĐƠN VỊ
                  </th>
                  <th style="min-width: 150px; width: 150px" id="">
                    SỐ TÀI KHOẢN
                  </th>
                  <th style="min-width: 250px; width: 250px" id="">
                    TÊN NGÂN HÀNG
                  </th>
                  <th
                    style="min-width: 250px; width: 250px; border-right: none"
                    id=""
                  >
                    CHI NHÁNH TK NGÂN HÀNG
                  </th>
                  <th
                    style="width: 120px; min-width: 120px; right: 30px"
                    class="wiget border-left"
                    id=""
                  >
                    <div>CHỨC NĂNG</div>
                  </th>
                  <th style="right: 0px" id="" class="out-right bgc-white"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(employee, index) in employeeList"
                  :key="index"
                  v-on:click="active(index)"
                  v-on:dblclick="edit(index)"
                >
                  <td id="" class="out-left-white bgc-white"></td>
                  <td
                    v-bind:class="{ selected: index == selectedRow }"
                    class="col-check"
                  >
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td v-bind:class="{ selected: index == selectedRow }">
                    {{ employee.employeeCode }}
                  </td>
                  <td v-bind:class="{ selected: index == selectedRow }">
                    {{ employee.employeeName }}
                  </td>
                  <td v-bind:class="{ selected: index == selectedRow }">
                    {{ convertGender(employee.gender) }}
                  </td>
                  <td v-bind:class="{ selected: index == selectedRow }">
                    <div class="center">
                      {{ convertDate(employee.dateOfBirth) }}
                    </div>
                  </td>
                  <td v-bind:class="{ selected: index == selectedRow }">
                    {{ employee.identityNumber }}
                  </td>
                  <td v-bind:class="{ selected: index == selectedRow }">
                    {{ employee.employeePosition }}
                  </td>
                  <td v-bind:class="{ selected: index == selectedRow }">
                    {{ employee.departmentName }}
                  </td>
                  <td v-bind:class="{ selected: index == selectedRow }">
                    {{ employee.bankAccountNumber }}
                  </td>
                  <td v-bind:class="{ selected: index == selectedRow }">
                    {{ employee.bankName }}
                  </td>
                  <td
                    style="border-right: none"
                    v-bind:class="{ selected: index == selectedRow }"
                  >
                    {{ employee.bankBranchName }}
                  </td>
                  <td
                    style="right: 30px"
                    v-bind:class="{ selected: index == selectedRow }"
                    class="sticky border-left"
                  >
                    <div class="col-edit">
                      <span v-on:click="edit(index)">Sửa</span>
                      <div class="div-more-icon">
                        <img
                          src="../Resource/img/more.svg"
                          alt=""
                          @click="showMoreOption($event, index)"
                        />
                      </div>
                    </div>
                  </td>
                  <td style="right: 0px" class="out-right bgc-white"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="wrap-footer">
            <div class="footer-content">
              <div class="count-record">
                <span
                  >Tổng số: <b>{{ countEmployee }}</b> bản ghi</span
                >
              </div>
              <div class="right-footer">
                <div class="div-select-count">
                  <div style="position: sticky; left: 60%; right: 40%">
                    <div
                      style="
                        max-width: 215px;
                        max-height: 32px;
                        display: flex;
                        top: -17px;
                        border: 1px solid #babec5;
                        margin: 0 16px;
                      "
                      data-app
                    >
                      <v-select
                        :items="optionCountPerPage"
                        v-model="countEmployeePerPage"
                        @change="changeCountPerPage"
                        solo
                      ></v-select>
                    </div>
                  </div>
                </div>
                <div class="wrap-paging">
                  <v-container class="max-width">
                    <v-pagination
                      v-model="selectedPage"
                      :length="countPage"
                      @input="getDataPage()"
                      :total-visible="7"
                    ></v-pagination>
                  </v-container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div-left-30"></div>
    <div
      v-if="showOption"
      :style="{ left: xClick + 'px', top: yClick + 'px' }"
      class="tool-tip"
      id="popupOption"
    >
      <div class="option" @click="cloneEmployee()">Nhân bản</div>
      <div class="option" @click="showWarning()">Xóa</div>
    </div>
    <div v-if="loading" class="wrap-loading">
        <div class="loading" style="width:fit-content;height:32px;">
          <img style="" src="../Resource/loading.svg" alt="">
        </div>
    </div>
  </div>
</template>

<script>
import EventBus from "./../main.js";
const axios = require("axios");
 export default {
  data() {
    return {
      employeeList: {}, // những nhân viên hiển thị lên màn hình
      countEmployee: 0, // số nhân viên lấy/tìm kiếm được
      selectedRow: 0, // hàng đang chọn
      countEmployeePerPage: 10, // số lượng bản ghi / trang
      countPage: 1, // số trang
      selectedPage: 1, // trang đang chọn
      optionCountPerPage: [
        { value: 10, text: "10 bản ghi trên 1 trang" },
        { value: 20, text: "20 bản ghi trên 1 trang" },
        { value: 30, text: "30 bản ghi trên 1 trang" },
        { value: 50, text: "50 bản ghi trên 1 trang" },
        { value: 100, text: "100 bản ghi trên 1 trang" },
      ],

      showOption: false, // ẩn hiện option xóa, nhân bản
      xClick: 0,
      yClick: 0,
      employee: null,
      keySearch: "",
      loading: true,
    };
  },

  methods: {
    // lấy số lượng bản ghi theo từ khóa tìm kiếm
    async getTotalRecord() {
      let me = this;
      this.loading = true;
      // bỏ khoảng trắng 2 đầu từ khóa
      let keySearch = me.keySearch.trim();
      // axios request
      await axios
        .request({
          method: "post",
          url: "http://localhost:8080/api/v1/Employees/GetTotalRecord",
          data: '"' + keySearch + '"',
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          // nếu số lượng lớn hơn 0 thì thực hiện gán cho các biến
          if (res.data != "") me.countEmployee = res.data;
          else me.countEmployee = 0;
          me.selectedPage = 1;
          me.selectedRow = 0;
          me.getDataServer();
        })
        .catch((err) => {
          // nếu có lỗi thì hiện thông báo lỗi
          console.log(err);
          this.loading - false;
          let message =
            "Lấy dữ liệu thất bại, vui lòng liên hệ Misa để được trợ giúp.";
          EventBus.$emit("showError", message);
        });
    },

    // hàm lấy dữ liệu từ server
    async getDataServer() {
      this.loading = true;
      let me = this;
      // bỏ khoảng trắng 2 đầu 
      let keySearch = me.keySearch.trim();
      // axios request
      await axios
        .request({
          method: "post",
          url:
            "http://localhost:8080/api/v1/Employees/GetPage?page=" +
            me.selectedPage +
            "&count=" +
            me.countEmployeePerPage,
          data: '"' + keySearch + '"',
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          // nếu thành công thì thực hiện gán 
          me.employeeList = res.data;
          me.countPage = Math.ceil(me.countEmployee / me.countEmployeePerPage);
          this.loading = false;
        })
        .catch((err) => {
          // nếu có lỗi thì hiện thông báo lỗi
          console.log(err);
          this.loading = false;
          let message =
            "Lấy dữ liệu thất bại, vui lòng liên hệ Misa để được trợ giúp.";
          EventBus.$emit("showError", message);
        });
    },

    // hàm xóa 1 nhân viên
    async deleteEmployee(employee) {
      this.loading = true;
      let url = "http://localhost:8080/api/v1/Employees/" + employee.employeeId;
      await axios
        .delete(url)
        .then((res) => {
          // nếu thành công thì hiện message box thông báo xóa thành công
          console.log(res);
          this.loading = false;
          let mode = "Xóa";
          EventBus.$emit("showSuccessBox", mode);
        })
        .catch((err) => {
          // nếu có lỗi xảy ra thì hiện thông báo lỗi
          this.loading = false;
          console.log(err);
          let message =
            "Có lỗi xảy ra khi xóa bản ghi, vui lòng liên hệ Misa để được trợ giúp.";
          EventBus.$emit("showError", message);
        });
    },

    // hàm thêm mới nhân viên
    addEmployee(){
      EventBus.$emit("addEmployee");
    },

    // sự kiện khi ấn vào các hàng
    active(index) {
      this.selectedRow = index;
    },

    // sự kiện khi ấn sửa
    edit(index) {
      let employee = null;
      if(index == undefined){
        employee = this.employeeList[this.selectedRow];
      }
      else employee = this.employeeList[index];
      employee.dateOfBirth = this.convertDate(employee.dateOfBirth);
      employee.identityDate = this.convertDate(employee.identityDate);
      EventBus.$emit("editEmployee", employee);
    },

    // hàm lấy dữ liệu từ server cho trang được chọn
    getDataPage() {
      this.selectedRow = 0;
      this.getDataServer();
    },

    // hàm khi thay đổi số lượng nhân viên hiển thị trên 1 trang
    changeCountPerPage() {
      this.selectedRow = 0;
      this.selectedPage = 1;
      this.getDataServer();
    },

    // hàm hiện popup option
    showMoreOption(e, index) {
      this.xClick = e.clientX - 280;
      this.yClick = e.clientY - 40;
      this.selectedRow = index;
      this.showOption = true;
    },

    // hàm reload lại dữ liệu
    refresh() {
      this.keySearch = "";
      this.getTotalRecord();
    },

    // hàm tìm kiếm từ
    searchKeyWord(){
      this.getTotalRecord();
    },

    // sự kiện ấn mũi tên xuống
    arrowDown() {
      if(this.selectedRow < this.countEmployeePerPage)
        this.selectedRow = this.selectedRow + 1;
    },

    // sự kiện ấn mũi tên lên
    arrowUp(){
      if(this.selectedRow > 0)
        this.selectedRow = this.selectedRow - 1;
    },

    // show form cảnh báo trước khi xóa
    showWarning() {
      let employee = {...this.employeeList[this.selectedRow]};
      EventBus.$emit("showWarning", employee);
      this.showOption = false;
    },

    // ẩn popup option nếu click ra ngoài
    clickMain(e) {
      let component = document.getElementById("ms-component-table");
      if (component != null && this.showOption) {
        if (!component.contains(e.target)) {
          this.showOption = false;
        }
      }
    },

    // chuyển đổi ngày tháng năm từ server thành dd/mm/yyyy để hiển thị
    convertDate(dateSrc) {
      if (dateSrc == null) return;
      let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, "0"),
        day = date.getDate().toString().padStart(2, "0");
      return `${day}/${month}/${year}`;
    },

    // chuyển đổi kiểu giới tính để hiển thị
    convertGender(gd) {
      switch (gd) {
        case 0:
          return "Nam";
        case 1:
          return "Nữ";
        case 2:
          return "Khác";
      }
    },

    // hàm nhân bản nhân viên
    cloneEmployee() {
      let employee = { ...this.employeeList[this.selectedRow] };
      employee.dateOfBirth = this.convertDate(employee.dateOfBirth);
      employee.identityDate = this.convertDate(employee.identityDate);
      EventBus.$emit("addEmployee", employee);
    },

  },

  created() {
    this.getTotalRecord();
  },

  mounted() {
    //hàm lắng nghe sự kiện khi các component khác gọi loadData
    EventBus.$on("loadDataServer", () => {
      this.getTotalRecord();
    });

    // lắng nghe sự kiên xóa nhân viên
    EventBus.$on("deleteEmployee", employee => {
      this.deleteEmployee(employee);
    });
  },

  
};
</script>

<style src="../css/googlefont.css"></style>
<style src="../css/main.css"></style>
<style src="../css/table.css"></style>
