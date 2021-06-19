<template>
    <div class="container-box">
        <div v-if="warning" class="wrap-message-form">
            <div class="message-box">
                <div class="div-content">
                    <div class="icon-message">
                        <img src="../Resource/img/warning.svg" alt="">
                    </div>
                    <div class="message-content">
                        <div>Bạn có chắc muốn xóa nhân viên "{{employee.employeeName}}"
                            , mã nhân viên là "{{employee.employeeCode}}" không?</div>
                    </div>
                </div>
                <div class="space"></div>
                <div class="mess-footer">
                    <button v-on:click="cancelMessageBox()" ref="btnNo" class="btn-no">Hủy</button>
                    <button v-on:click="deleteEmployee()" ref="btnOk" class="btn-ok">Có</button>
                </div>
            </div>
        </div>
        <div v-if="error" class="wrap-message-form">
            <div class="message-box">
                <div class="div-content">
                    <div class="icon-message">
                        <img src="../Resource/img/warning.svg" alt="">
                    </div>
                    <div class="message-content">
                        <div> {{messageContent}}</div>
                    </div>
                    
                </div>
                <div class="space"></div>
                <div class="mess-footer">
                    <button v-on:click="cancelErrorBox()" ref="btnAgree" class="btn-ok">Đồng ý</button>
                </div>
            </div>
        </div>
        <div v-if="warningDataChange" class="wrap-message-form">
            <div class="message-box">
                <div class="div-content">
                    <div class="icon-message">
                        <img src="../Resource/img/warning.svg" alt="">
                    </div>
                    <div class="message-content">
                        <div>Dữ liệu đã thay đổi, bạn có chắc muốn đóng không?</div>
                    </div>
                </div>
                <div class="space"></div>
                <div class="mess-footer">
                    <button v-on:click="()=>{this.warningDataChange = false}" ref="btnNo" class="btn-no">Hủy</button>
                    <button v-on:click="cancelFormDetail()" ref="btnOk" class="btn-ok">Có</button>
                </div>
            </div>
        </div>
        <div v-if="successBox" class="success-box">
            <div style="height: 36px;display:flex;flex-direction:row;margin-bottom:25px;">
                <div style="height:100%; width:36px;">
                    <img src="../Resource/img/success.svg" alt="">
                </div>
                <div class="success-content">
                    <span>{{successMode}} thành công</span>
                </div>
            </div>
            <div class="space" style="margin-bottom:10px;"></div>
            <div>
                <button v-on:click="cancelSuccessBox()" class="btn-ok">OK</button>
            </div>
        </div>
    </div>
</template>
<script>
import EventBus from '../main.js';
export default {
    data() {
        return {
            warning: false,  // ẩn hiện form cảnh báo
            messageContent: null, // nội dung thông báo cho người dùng
            error: false, // ẩn hiện box báo lỗi
            field: null, // trường cần focus sau khi tắt message-box
            warningDataChange: false, //ẩn hiện message box cảnh báo khi tắt form detail nếu dữ liệu thay đổi
            successBox: false,
            successMode: null,

            // nhân viên hiển thị trên form warning
            employee : {
              employeeCode : null,
              employeeName : null,
              gender : 0,
              dateOfBirth : null,
              departmentName: null,
              identityDate : null,
              identityPlace : null,
              employeePosition : null,
              address : null,
              bankAccountNumber : null,
              bankName : null,
              bankBranchName : null,
              bankProvinceName : null,
              phoneNumber : null,
              telephoneNumber : null,
              email : null,
            },
        }
    },

    methods:{
        // hàm đóng message box
        cancelMessageBox(){
            this.warning = false;
        },

        // tắt form báo lỗi
        cancelErrorBox(){
            this.error = false;
            if(this.field !=null){
                EventBus.$emit("focusAndSelectAll", this.field);
                this.field = null;
            }
        },

        // hàm hiện hộp cảnh báo
        showWarning(employee){
            this.employee = {...employee};
            this.warning = true;
        },

        // hàm emit xóa nhân viên
        deleteEmployee(){
            EventBus.$emit("deleteEmployee", this.employee);
            this.warning = false;
        },
        
        // hàm hiển thị message box thông báo lỗi
        showError(message, field){
            this.messageContent = message;
            this.error = true;
            this.field = field;
            setTimeout(() =>
                this.error = false, 2500
            )
        },

        // hàm emit tắt form detail
        cancelFormDetail(){
            this.warningDataChange = false;
            EventBus.$emit("cancelFormDetail");
        },

        showSuccessBox(){
            this.successBox = true;
            setTimeout(()=>
                this.successBox = false, 2500
            )
        },

        // hàm tắt success box
        cancelSuccessBox(){
            this.successBox = false;
        },

        showWarningDataChange(){
            this.warningDataChange = true;
            setTimeout(() =>
                this.warningDataChange = false, 5000
            )
        }
    },

    mounted() {
        // lắng nghe sự kiện hiện form cảnh báo
        EventBus.$on("showWarning", (employee) => {
            this.showWarning(employee);
        });

        // lắng nghe sự kiện hiện thông báo lỗi
        EventBus.$on("showError", (content ,field)=> {
            this.showError(content, field);
        });

        // lắng nghe sự kiện hiện form cảnh báo dữ liệu thay đổi
        EventBus.$on("showWarningDataChange", ()=>{
            this.showWarningDataChange();
        });

        // lắng nghe sự kiện hiện success box
        EventBus.$on("showSuccessBox", (mode)=>{
            this.successMode = mode;
            this.showSuccessBox();
        })
    }
}
</script>

<style src="../css/messagebox.css"></style>
<style src="../css/googlefont.css"></style>