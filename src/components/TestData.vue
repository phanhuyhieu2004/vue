<template>
  <div style="min-height: 100vh;">
    <q-dialog v-model="confirmDialog.visible">
      <q-card>


        <q-card-section>
          <q-avatar icon="delete" color="primary" text-color="white"/>
          Bạn có chắc chắn muốn xóa mục này không?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Hủy" color="primary" v-close-popup/>
          <q-btn flat label="Xóa" color="red" @click="confirmDelete"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body-cell="props">
          <q-td :props="props">
            {{ props.value }}
          </q-td>
          <q-menu touch-position context-menu>
            <q-list dense style="min-width: 100px">
              <q-item @click="showDetails(props.row.id)" clickable v-close-popup>
                <q-item-section>Show...</q-item-section>
              </q-item>
              <q-item @click="editItem(props.row.id)" clickable v-close-popup>
                <q-item-section>Edit</q-item-section>
              </q-item>
              <q-item @click="openDeleteConfirm(props.row.id)" clickable v-close-popup>
                <q-item-section>Delete</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      networksList: [],

      confirmDialog: {
        visible: false,
        networkId: null,
      },
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.tenLinkMang,
          sortable: true
        },
        {name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true},
        // Add other columns as needed
      ],
      rows: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    };
  },

  created() {
    this.fetchNetWorksList();
  },

  methods: {
    async fetchNetWorksList(condition = null) {
      try {
        const token = localStorage.getItem("token");
        const payload = {
          condition: Array.isArray(condition) ? condition : [],
          page: this.pagination.page,
          size: this.pagination.rowsPerPage,
          projection: {
            field: [
              "tt",
              "ten_link_mang",
              "cap",
              "mang",
              "cid",
              "trang_thai",
              "bang_thong_link_mbps",
              "ten_thiet_bi_diem_dau",
              "port_thiet_bi_diem_dau",
              "ten_thiet_bi_diem_cuoi",
              "port_thiet_bi_diem_cuoi",
              "ten_odf_diem_dau",
              "port_odf_diem_dau",
              "tuyen_cap",
              "khu_vuc",
              "dia_chi_diem_dau",
              "tinh_diem_dau",
              "dia_chi_diem_cuoi",
              "tinh_diem_cuoi",
              "cidma_hop_dong_doi_tac",
              "ngay_up_link",
              "phongban_up_link",
              "ngay_huy_link",
              "phongban_huy_link",
              "dau_moi_lien_he_doi_tac",
              "thong_tin_ghi_chu"
            ],
          }
        };

        const response = await axios.post(
          "https://apidev.hitc.vn/moappapiv2/api/data/dhm_danhsachlinkmang_list/paging",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          this.pagination.rowsNumber = response.data.total;
          this.rows = response.data.data.map(item => ({
            id: item._id,
            tt: item.tt,
            tenLinkMang: item.ten_link_mang,
            // Map other fields as needed
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    openDeleteConfirm(networkId) {
      this.confirmDialog.visible = true;
      this.confirmDialog.networkId = networkId;
    },
    confirmDelete() {
      const networkId = this.confirmDialog.networkId;

      // Gọi API hoặc xử lý logic xóa
      this.deleteNetwork(networkId);

      // Đóng dialog
      this.confirmDialog.visible = false;
    },
    async deleteNetwork(networkId) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`https://apidev.hitc.vn/moappapiv2/api/data/dhm_danhsachlinkmang_update/delete`, {
          data: {
            condition: [
              {
                field: "_id",
                oper: "==",
                value: networkId,
                update: []
              }
            ]
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.networksList = this.networksList.filter(n => n._id !== networkId);
        this.fetchNetWorksList();
        this.total = this.total - 1;
        this.$q.notify({
          color: 'positive',
          message: 'Xóa thành công!',
          icon: 'check_circle'
        });


      } catch (error) {
        console.error('Lỗi khi xóa mạng:', error);
      }
    },

  }
};
</script>

<style scoped>
.q-pa-md {
  padding: 16px;
}
</style>

