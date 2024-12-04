<template>

  <q-layout>
    <q-page-container>
      <q-page>
        <div class="q-pa-md q-gutter-sm">
          <div class="row items-center header-contaniner">
            <!-- Bên trái -->
            <div class="row items-center col-auto header-col-1">
              <!-- Thanh dọc -->
              <q-separator
                vertical
                class="bg-primary"
                style="height: 50px; width: 3px; margin-right: 16px"
              />
              <!-- Tiêu đề -->
              <span class="title-header text-h6 ">Danh sách link mạng</span>
            </div>

            <!-- Bên phải -->
            <div class="row items-center justify-end col header-col-2">
              <!-- Nút lọc -->
              <q-btn
                flat
                round
                icon="filter_list"
                @click="search = true"
                class="q-mr-sm"
              >
                <q-tooltip class="bg-indigo" :offset="[10, 10]">Lọc</q-tooltip>
              </q-btn>


              <q-btn
                icon="search"
                @click="toggleSearchBox"
                class="q-mr-sm"
                round
                flat

              />

              <!-- Quasar Input chỉ hiển thị khi isSearchOpen là true -->
              <q-input
                v-if="isSearchOpen"
                ref="searchInput"
                v-model="searchValues"
                placeholder="Tìm kiếm theo"

                debounce="300"
                @change="searchNetworks"
                class="search-input"
              >
                <template v-slot:append>
                  <q-icon name="close" @click="toggleSearchBox"/>
                </template>
              </q-input>
              <!-- Nút cài đặt -->
              <q-btn flat round icon="settings" class="q-mr-sm">
                <q-tooltip class="bg-indigo">Cài đặt</q-tooltip>
              </q-btn>
              <!-- Dropdown thêm mới -->
              <q-btn-dropdown
                style="width: 150px"
                color="primary"
                split
                icon="add"
                label="Thêm mới"
                @click="openDialog"
              >
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar icon="folder" color="primary" text-color="white"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Photos</q-item-label>
                      <q-item-label caption>February 22, 2016</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="info" color="amber"/>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar
                        icon="assignment"
                        color="secondary"
                        text-color="white"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Vacation</q-item-label>
                      <q-item-label caption>February 22, 2016</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="info" color="amber"/>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
        </div>
        <q-dialog v-model="fixed">
          <q-card style="width: 80vw; max-width: 1200px; height: 100vh;">
            <q-layout style="min-height: 100vh; display: flex; flex-direction: column;">
              <q-header elevated>
                <q-toolbar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                  </q-avatar>
                  <q-toolbar-title>
                    <strong>Chi tiết link mạng</strong>
                  </q-toolbar-title>
                </q-toolbar>
              </q-header>

              <div style="overflow-y: auto; flex-grow: 1; padding: 30px; max-height: calc(100vh - 100px);">
                <q-card-section>



                    <!-- Hàng 1 -->

                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.tt" label="TT" :value="currentNetwork.tt || 'NA'" />

                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.ten_link_mang" label="Tên link mạng" :value="currentNetwork.ten_link_mang || 'NA'">
                          <q-tooltip v-if="currentNetwork.ten_link_mang ">
                            {{ currentNetwork.ten_link_mang }}
                          </q-tooltip>
                        </q-input>

                      </q-col>

                    </q-row>


                    <!-- Hàng 2 -->

                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.cap.value" label="Cáp" :value="currentNetwork.cap.value|| 'NA'" />

                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.trang_thai.value" label="Trạng thái" :value="currentNetwork.trang_thai.value || 'NA'" />

                      </q-col>

                    </q-row>


                    <!-- Hàng 3 -->

                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">
                        <q-input dense outlined readonly v-model="currentNetwork.bang_thong_link_mbps" label="Băng thông link (Mbps)" :value="currentNetwork.bang_thong_link_mbps || 'NA'" />

                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.ten_thiet_bi_diem_dau.value" label="Tên thiết bị điểm đầu" :value="currentNetwork.ten_thiet_bi_diem_dau.value || 'NA'" >
                          <q-tooltip v-if="currentNetwork.ten_thiet_bi_diem_dau.value ">
                            {{ currentNetwork.ten_thiet_bi_diem_dau.value }}
                          </q-tooltip>
                        </q-input>

                      </q-col>

                    </q-row>


                    <!-- Hàng 4 -->

                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.port_thiet_bi_diem_dau.value" label="Port thiết bị điểm đầu" :value="currentNetwork.port_thiet_bi_diem_dau.value || 'NA'" >
                          <q-tooltip v-if="currentNetwork.port_thiet_bi_diem_dau.value ">
                            {{ currentNetwork.port_thiet_bi_diem_dau.value }}
                          </q-tooltip>
                        </q-input>

                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.ten_thiet_bi_diem_cuoi.value" label="Tên thiết bị điểm cuối" :value="currentNetwork.ten_thiet_bi_diem_cuoi.value || 'NA'" >
                          <q-tooltip v-if="currentNetwork.ten_thiet_bi_diem_cuoi.value ">
                            {{ currentNetwork.ten_thiet_bi_diem_cuoi.value }}
                          </q-tooltip>
                        </q-input>

                      </q-col>

                    </q-row>
                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.port_thiet_bi_diem_cuoi.value" label="Port thiết bị điểm cuối" :value="currentNetwork.port_thiet_bi_diem_cuoi.value || 'NA'" >
                          <q-tooltip v-if="currentNetwork.port_thiet_bi_diem_cuoi.value ">
                            {{ currentNetwork.port_thiet_bi_diem_cuoi.value }}
                          </q-tooltip>
                        </q-input>

                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.ten_odf_diem_dau " label="Tên ODF điểm đầu " :value="currentNetwork.ten_odf_diem_dau || 'NA'"/>



                      </q-col>

                    </q-row>
                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.port_odf_diem_dau " label="Port ODF điểm đâù " :value="currentNetwork.port_odf_diem_dau  || 'NA'"/>


                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.tuyen_cap  " label="Tuyến cáp " :value="currentNetwork.tuyen_cap  || 'NA'"/>



                      </q-col>

                    </q-row>

                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.khu_vuc.value" label="Khu vực"  :value="currentNetwork.khu_vuc.value  || 'NA'"/>

                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.dia_chi_diem_dau" label="Địa chỉ điểm đầu" :value="currentNetwork.dia_chi_diem_dau  || 'NA'"/>

                      </q-col>

                    </q-row>


                    <!-- Hàng 5 -->

                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.tinh_diem_dau.value" label="Tỉnh điểm đầu" :value="currentNetwork.tinh_diem_dau.value  || 'NA'"/>

                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.dia_chi_diem_cuoi" label="Địa chỉ điểm cuối" :value="currentNetwork.dia_chi_diem_cuoi  || 'NA'"/>

                      </q-col>

                    </q-row>


                    <!-- Hàng 6 -->

                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.tinh_diem_cuoi.value " label="Tỉnh điểm cuối" :value="currentNetwork.tinh_diem_cuoi.value  || 'NA'"/>

                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.ngay_up_link" label="Ngày up link"  :value="currentNetwork.ngay_up_link || 'NA'"/>

                      </q-col>

                    </q-row>


                    <!-- Hàng 7 -->

                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.ngay_huy_link" label="Ngày hủy link" :value="currentNetwork.ngay_huy_link || 'NA'"/>

                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.dau_moi_lien_he_doi_tac " label="Đầu mối liên hệ đối tác" :value="currentNetwork.dau_moi_lien_he_doi_tac  || 'NA'"/>


                      </q-col>

                    </q-row>


                    <!-- Hàng 8 -->

                    <q-row class="q-gutter-md flex-field">

                      <q-col cols="4" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.thong_tin_ghi_chu " label="Thông tin ghi chú" :value="currentNetwork.thong_tin_ghi_chu  || 'NA'"/>

                      </q-col>

                      <q-col cols="8" class="flex-col">

                        <q-input dense outlined readonly v-model="currentNetwork.phongban_up_link.value" label="Phòng/ban up link"  :value="currentNetwork.phongban_up_link  || 'NA'"/>

                      </q-col>

                    </q-row>



                </q-card-section>
              </div>

              <q-separator/>

              <q-card-actions align="right">
                <q-btn flat label="Đóng" color="primary" v-close-popup/>
              </q-card-actions>
            </q-layout>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogVisible">
          <q-card style="width: 80vw; max-width: 1200px;">
            <q-layout style="min-height: 0;">
              <q-header elevated>
                <q-toolbar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                  </q-avatar>
                  <q-toolbar-title>
                    <strong>Sửa link mạng</strong>
                  </q-toolbar-title>
                </q-toolbar>
              </q-header>
              <div style="overflow-y: auto; max-height: 70vh; padding: 20px">
                <q-form class="form-grid">

                  <div class="input-attribute">
                    <strong>Tên Link Mạng <span class="important-fields">*</span> :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.ten_link_mang" clearable label="Chọn tên link mạng"/>
                  </div>
                  <div class="input-attribute">
                    <strong>Cáp <span class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.cap"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn loại cáp"
                      input-debounce="300"
                      :options="cables"
                      @filter="filterFn"
                      clearable
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute">
                    <strong>Mạng <span class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.mang"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn loại mạng"
                      clearable
                      input-debounce="300"
                      :options="networks"
                      @filter="filterFnNetworks"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute">
                    <strong>CID <span class="important-fields">*</span> : </strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled clearable
                             v-model="formData.cid" label="Chọn CID"/>
                  </div>
                  <div class="input-attribute"><strong>Trạng thái <span class="important-fields">*</span> :
                  </strong>
                    <q-select
                      filled
                      v-model="formData.trang_thai"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn trạng thái"
                      clearable
                      input-debounce="300"
                      :options="status"
                      @filter="filterFnStatus"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="input-attribute"><strong>Băng thông link <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled clearable
                             v-model="formData.bang_thong_link_mbps" label="Chọn Băng thông"/>
                  </div>
                  <div class="input-attribute"><strong>Tên thiết bị điểm đầu <span class="important-fields">*</span>
                    : </strong>
                    <q-select
                      filled
                      v-model="formData.ten_thiet_bi_diem_dau"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn TBDV"
                      input-debounce="300"
                      :options="device"
                      @filter="filterFnDevice"
                      @virtual-scroll="onScroll"
                      clearable
                      :loading="loading"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="input-attribute"><strong>Port thiết bị điểm đầu <span
                    class="important-fields">*</span> :
                  </strong>
                    <q-select
                      filled
                      v-model="formData.port_thiet_bi_diem_dau"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn Port thiết bị điểm đầu"
                      clearable
                      input-debounce="300"
                      :options="port"
                      @filter="filterFnPort"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"

                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute"><strong>Tên thiết bị điểm cuối <span
                    class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.ten_thiet_bi_diem_cuoi"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn TBDC"
                      input-debounce="300"
                      :options="device"
                      @filter="filterFnDevice"
                      @virtual-scroll="onScroll"
                      clearable
                      :loading="loading"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>

                  <div class="input-attribute"><strong>Port thiết bị điểm cuối <span
                    class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.port_thiet_bi_diem_cuoi"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn Port thiết bị điểm cuoi"
                      clearable
                      input-debounce="300"
                      :options="port"
                      @filter="filterFnPort"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"

                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute"><strong>Tên ODF điểm đầu <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled clearable
                             v-model="formData.ten_odf_diem_dau" label="ODF"/>

                  </div>
                  <div class="input-attribute"><strong>Port ODF điểm đâù <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled clearable
                             v-model="formData.port_odf_diem_dau" label="Port ODF"/>

                  </div>
                  <div class="input-attribute"><strong>Tuyến cáp <span class="important-fields">*</span> :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled clearable
                             v-model="formData.tuyen_cap" label="Tuyến cáp"/>

                  </div>
                  <div class="input-attribute"><strong>Khu vực <span class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.khu_vuc"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn khu vực"
                      clearable
                      input-debounce="300"
                      :options="areas"
                      @filter="filterFnAreas"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"

                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="input-attribute"><strong>Địa chỉ điểm đầu <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled clearable
                             v-model="formData.dia_chi_diem_dau" label="Chọn địa chỉ điểm đầu"/>

                  </div>
                  <div class="input-attribute"><strong>Tỉnh điểm đầu <span class="important-fields">*</span>
                    :</strong>
                    <q-select
                      filled
                      v-model="formData.tinh_diem_dau"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn tỉnh điểm đâù"
                      input-debounce="300"
                      :options="province"
                      @filter="filterFnProvince"
                      @virtual-scroll="onScrollProvince"
                      clearable
                      :loading="loading"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute"><strong>Địa chỉ điểm cuối <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled clearable
                             v-model="formData.dia_chi_diem_cuoi" label="Chọn địa chỉ điểm cuối"/>

                  </div>
                  <div class="input-attribute"><strong>Tỉnh điểm cuối <span class="important-fields">*</span>
                    :</strong>
                    <q-select
                      filled
                      v-model="formData.tinh_diem_cuoi"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn tỉnh điểm cuối"
                      input-debounce="300"
                      :options="province"
                      @filter="filterFnProvince"
                      @virtual-scroll="onScrollProvince"
                      clearable
                      :loading="loading"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute"><strong>CIDMA hợp đồng đối tác <span
                    class="important-fields">*</span> :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled clearable
                             v-model="formData.cidma_hop_dong_doi_tac" label="Chọn CID/Hợp đồng đối tác"/>

                  </div>
                  <div class="input-attribute">
                    <strong>Ngày up link:</strong>

                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.ngay_up_link" mask="##/##/####" clearable>
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="formData.ngay_up_link" mask="DD/MM/YYYY">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat/>
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <div class="input-attribute"><strong>Phòng ban up link <span class="important-fields">*</span>
                    :</strong>

                    <q-select
                      filled
                      v-model="formData.phongban_up_link"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn phòng ban up link"
                      clearable
                      input-debounce="300"
                      :options="departments"
                      @filter="filterFnDepartment"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"

                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="input-attribute"><strong>Ngày hủy link <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.ngay_huy_link" mask="##/##/####" clearable label="Chọn ngày hủy link">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="formData.ngay_huy_link" mask="DD/MM/YYYY">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat/>
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="input-attribute"><strong>Phòng ban hủy link <span class="important-fields">*</span>
                    :</strong>
                    <q-select
                      filled
                      v-model="formData.phongban_huy_link"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn phòng ban hủy link"
                      clearable
                      input-debounce="300"
                      :options="departments"
                      @filter="filterFnDepartment"

                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute"><strong>Đầu mối liên hệ đối tác <span
                    class="important-fields">*</span> :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.dau_moi_lien_he_doi_tac" clearable
                             label="Chọn đầu moi lien hệ đối tác"/>

                  </div>
                  <div class="input-attribute"><strong>Thông tin ghi chú <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.thong_tin_ghi_chu" clearable label="Chọn thong tin ghi chú"/>

                  </div>

                </q-form>
              </div>
            </q-layout>


            <q-separator/>

            <q-card-actions align="right">
              <q-btn color="primary" label="Cập nhật" @click="updateLinkMang(formData._id)"/>

              <q-btn flat label="Hủy" color="primary" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
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
        <q-dialog v-model="created">
          <q-card style="width: 80vw; max-width: 1200px;">
            <q-layout style="min-height: 0;">
              <q-header elevated>
                <q-toolbar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                  </q-avatar>
                  <q-toolbar-title>
                    <strong>Thêm link mạng</strong>
                  </q-toolbar-title>
                </q-toolbar>
              </q-header>
              <div style="overflow-y: auto; max-height: 70vh; padding: 20px">
                <q-form class="form-grid">
                  <div class="input-attribute">
                    <strong>Tên Link Mạng <span class="important-fields">*</span> :</strong>
                    <q-input filled v-model="formData.ten_link_mang" clearable label="Chọn tên link mạng"
                             :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"/>
                  </div>


                  <div class="input-attribute">
                    <strong>Cáp <span class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.cap"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn loại cáp"
                      input-debounce="300"
                      :options="cables"
                      @filter="filterFn"
                      clearable
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>

                  <div class="input-attribute">
                    <strong>Mạng <span class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.mang"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn loại mạng"

                      input-debounce="300"
                      :options="networks"
                      @filter="filterFnNetworks"
                      clearable
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>

                  <div class="input-attribute">
                    <strong>CID <span class="important-fields">*</span> :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled v-model="formData.cid"
                             clearable label="Chọn CID"/>
                  </div>

                  <div class="input-attribute"><strong>Trạng thái <span class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.trang_thai"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn trạng thái"
                      clearable
                      input-debounce="300"
                      :options="status"
                      @filter="filterFnStatus"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="input-attribute"><strong>Băng thông link <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[
    val => !!val || 'Đây là trường bắt buộc nhập',
    val => val >= 0 || 'Vui lòng nhập số dương'
  ]" filled v-model="formData.bang_thong_link_mbps" clearable label="Chọn Băng thông" type="number"

                    />
                  </div>
                  <div class="input-attribute"><strong>Tên thiết bị điểm đầu <span class="important-fields">*</span> :
                  </strong>
                    <q-select
                      filled
                      v-model="formData.ten_thiet_bi_diem_dau"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn TBDV"
                      input-debounce="300"
                      :options="device"
                      @filter="filterFnDevice"
                      @virtual-scroll="onScroll"
                      clearable
                      :loading="loading"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="input-attribute"><strong>Port thiết bị điểm đầu <span class="important-fields">*</span> :
                  </strong>
                    <q-select
                      filled
                      v-model="formData.port_thiet_bi_diem_dau"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn Port thiết bị điểm đầu"
                      clearable
                      input-debounce="300"
                      :options="port"
                      @filter="filterFnPort"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"

                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute"><strong>Tên thiết bị điểm cuối <span class="important-fields">*</span>
                    :</strong>
                    <q-select
                      filled
                      v-model="formData.ten_thiet_bi_diem_cuoi"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn TBDC"
                      input-debounce="300"
                      :options="device"
                      @filter="filterFnDevice"
                      @virtual-scroll="onScroll"
                      clearable
                      :loading="loading"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>

                  <div class="input-attribute"><strong>Port thiết bị điểm cuối <span class="important-fields">*</span>
                    :</strong>
                    <q-select
                      filled
                      v-model="formData.port_thiet_bi_diem_cuoi"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn Port thiết bị điểm cuoi"
                      clearable
                      input-debounce="300"
                      :options="port"
                      @filter="filterFnPort"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"

                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute"><strong>Tên ODF điểm đầu <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.ten_odf_diem_dau" clearable label="ODF"/>

                  </div>
                  <div class="input-attribute"><strong>Port ODF điểm đâù <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.port_odf_diem_dau" clearable label="Port ODF"/>

                  </div>
                  <div class="input-attribute"><strong>Tuyến cáp <span class="important-fields">*</span> :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.tuyen_cap"
                             clearable label="Tuyến cáp"/>


                  </div>
                  <div class="input-attribute"><strong>Khu vực <span class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.khu_vuc"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn khu vực"

                      input-debounce="300"
                      :options="areas"
                      @filter="filterFnAreas"
                      clearable
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="input-attribute"><strong>Địa chỉ điểm đầu <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.dia_chi_diem_dau" clearable label="Chọn địa chỉ điểm đầu"/>

                  </div>
                  <div class="input-attribute"><strong>Tỉnh điểm đầu <span class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.tinh_diem_dau"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn tỉnh điểm đâù"
                      input-debounce="300"
                      :options="province"
                      @filter="filterFnProvince"
                      @virtual-scroll="onScrollProvince"
                      clearable
                      :loading="loading"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute"><strong>Địa chỉ điểm cuối <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.dia_chi_diem_cuoi" clearable label="Chọn địa chỉ điểm cuối"/>

                  </div>
                  <div class="input-attribute"><strong>Tỉnh điểm cuối <span class="important-fields">*</span> :</strong>
                    <q-select
                      filled
                      v-model="formData.tinh_diem_cuoi"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn tỉnh điểm cuối"
                      input-debounce="300"
                      :options="province"
                      @filter="filterFnProvince"
                      @virtual-scroll="onScrollProvince"
                      clearable
                      :loading="loading"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute"><strong>CIDMA hợp đồng đối tác <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.cidma_hop_dong_doi_tac" clearable label="Chọn CID/Hợp đồng đối tác"/>

                  </div>
                  <div class="input-attribute">
                    <strong>Ngày up link <span class="important-fields">*</span> :</strong>

                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.ngay_up_link "
                             mask="##/##/####" clearable label="Ngày up link">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="formData.ngay_up_link" mask="DD/MM/YYYY">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat/>
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <div class="input-attribute"><strong>Phòng ban up link <span class="important-fields">*</span>
                    :</strong>

                    <q-select
                      filled
                      v-model="formData.phongban_up_link"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn phòng ban up link"
                      clearable
                      input-debounce="300"
                      :options="departments"
                      @filter="filterFnDepartment"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"

                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="input-attribute">
                    <strong>Ngày hủy link <span class="important-fields">*</span> :</strong>

                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.ngay_huy_link" mask="##/##/####" clearable label="Ngày hủy link">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="formData.ngay_huy_link" mask="DD/MM/YYYY">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat/>
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="input-attribute"><strong>Phòng ban hủy link <span class="important-fields">*</span>
                    :</strong>
                    <q-select
                      filled
                      v-model="formData.phongban_huy_link"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn phòng ban hủy link"
                      clearable
                      input-debounce="300"
                      :options="departments"
                      @filter="filterFnDepartment"
                      :rules="[val => !!val || 'Đây là trường bắt buộc nhập']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>
                  <div class="input-attribute"><strong>Đầu mối liên hệ đối tác <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.dau_moi_lien_he_doi_tac" clearable label="Chọn đầu moi lien hệ đối tác"/>

                  </div>
                  <div class="input-attribute"><strong>Thông tin ghi chú <span class="important-fields">*</span>
                    :</strong>
                    <q-input :rules="[val => !!val || 'Đây là trường bắt buộc nhập']" filled
                             v-model="formData.thong_tin_ghi_chu" clearable label="Chọn thong tin ghi chú"/>

                  </div>

                </q-form>
              </div>

            </q-layout>

            <q-separator/>

            <q-card-actions align="right">
              <q-btn label="Thêm mới" color="primary" @click="submitForm"/>

              <q-btn flat label="Hủy" color="primary" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="search">
          <q-card>
            <q-card-section>
              <q-form>
                <div class="column q-pa-sm">
                  <div class="row justify-between q-mb-sm">
                    <div class="q-ml-sm flex" style="color: black; align-items: center;font-weight: 700;">
                      Tên link mạng
                    </div>

                    <q-select
                      class="q-ml-sm select-filter no-border search-filter"
                      outlined
                      dense
                      v-model="filterTypeLink"
                      :options="options"

                      emit-value
                      map-options
                    />

                  </div>


                  <div class="row">
                    <q-input
                      class="col-md-6"
                      filled
                      v-model="searchValue"
                      label="Nhập tên link mạng"
                      clearable


                    >

                    </q-input>


                  </div>

                </div>
                <div class="column q-pa-sm">
                  <div class="row justify-between q-mb-sm">
                    <div class="q-ml-sm  flex" style="color: black; align-items: center; font-weight: 700;">
                      Cáp
                    </div>

                    <q-select
                      class="q-ml-sm select-filter search-filter"
                      outlined
                      dense
                      v-model="filterTypeCable"
                      :options="optionsCable"

                      emit-value
                      map-options
                    />
                  </div>


                  <div class="row">
                    <q-select
                      filled
                      v-model="searchValueCable"
                      use-input
                      hide-selected
                      fill-input
                      label="Chọn loại cáp"
                      input-debounce="300"
                      :options="cables"
                      @filter="filterFn"
                      clearable

                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Không có giá trị phù hợp
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                  </div>

                </div>
                <div class="column q-pa-sm">
                  <div class="row justify-between q-mb-sm">
                    <div class="q-ml-sm  flex" style="color: black; align-items: center;font-weight: 700;">
                      Ngày up link
                    </div>

                    <q-select
                      class="q-ml-sm select-filter search-filter"
                      outlined
                      dense
                      v-model="filterTypeDate"
                      :options="optionsDate"
                      emit-value
                      map-options

                    />
                  </div>

                  <div v-if="filterTypeDate === 'during'">
                    <div class="row" style="gap:20px">
                      <q-input filled v-model="searchDate" mask="##/##/####" clearable>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="searchDate" mask="DD/MM/YYYY">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat/>
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <q-input filled v-model="searchDate2" mask="##/##/####" clearable>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="searchDate2" mask="DD/MM/YYYY">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat/>
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>

                  <div v-else>
                    <q-input filled v-model="searchDate" mask="##/##/####" clearable>
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="searchDate" mask="DD/MM/YYYY">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="close" color="primary" flat/>
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>

              </q-form>


            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
              <q-btn label="Tìm kiếm" color="primary" @click="searchNetworks"/>

              <q-btn flat label="Hủy" color="primary" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
<!--        <div class="q-pa-md">-->
<!--          <p v-if="isSearchTriggered===true">-->
<!--            Kết quả tìm kiếm của-->
<!--            <span v-if="searchDate && searchDate2">Ngày: {{ this.formatDates(searchDate) }} - {{ this.formatDates(searchDate2) }}</span>-->
<!--            <span v-else-if="searchDate">Ngày: {{ this.formatDates(searchDate)}}</span>-->
<!--            <span v-else-if="searchValue">Mạng: {{ searchValue }}</span>-->
<!--            <span v-else-if="searchValueCable">Cáp: {{ searchValueCable.label }}</span>-->
<!--          </p>-->
<!--        </div>-->
        <div class="q-pa-md">
          <q-table

            ref="tableRef"

            v-model:pagination="pagination"

            :rows="rows"

            :columns="columns"

            row-key="id"

            separator="cell"

            :selected-rows-label="getSelectedString"

            selection="multiple"

            :selected="selected"

            @selection="onSelection"
            class="q-mb-md custom-table"

          >

            <!-- Header -->

            <template v-slot:header="props">

              <q-tr :props="props">

                <q-th auto-width>

                  <q-checkbox

                    v-model="props.selected"

                    :indeterminate="props.indeterminate"

                    @update:model="props.onToggle"

                  />

                </q-th>

                <q-th

                  v-for="column in props.cols"

                  :key="column.name"

                  @click="sortRows(column.field)"

                  :class="{ sortable: true }"

                >

                  {{ column.label }}

                  <span v-if="sort.field === column.field">

              <i :class="sort.order === 'asc' ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'"></i>

            </span>

                </q-th>

              </q-tr>

            </template>


            <!-- Body -->

            <template v-slot:body="props">
              <q-tr>
                <q-td auto-width>
                  <q-checkbox v-model="props.selected"/>
                </q-td>
                <q-td v-for="column in columns" :key="column.name" :props="props">
                  {{ props.row[column.field] }}
                  <q-menu touch-position context-menu>
                    <q-list dense style="min-width: 100px; padding: 10px">
                      <q-item @click="infoNetwork(props.row.id)" clickable v-close-popup>
                        <q-item-section avatar>
                          <q-icon name="info" class="text-primary"/>
                        </q-item-section>
                        <q-item-section>Chi tiết</q-item-section>
                      </q-item>
                      <q-item @click="showItem(props.row.id)" clickable v-close-popup>
                        <q-item-section avatar>
                          <q-icon name="edit" class="text-primary"/>
                        </q-item-section>
                        <q-item-section>Sửa</q-item-section>
                      </q-item>
                      <q-item @click="openDeleteConfirm(props.row.id)" clickable v-close-popup>
                        <q-item-section avatar>
                          <q-icon name="delete" class="text-primary"/>
                        </q-item-section>
                        <q-item-section>Xóa</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>

                </q-td>
              </q-tr>
            </template>
          </q-table>

        </div>

        <q-page-sticky :offset="[38, 38]" style="position: fixed; right: -56px; bottom: 199px; z-index: 100;">
          <q-fab style="width: 60px; height: fit-content;" icon="keyboard_arrow_left" direction="left" color="primary">
            <div class="q-pa-md q-gutter-md">
              <q-badge rounded color="orange" :label="getSelectedString()"/>
            </div>
            <q-fab-action @click="onClick('delete')" label="Xóa" label-position="left" external-label color="primary"
                          icon="delete" class="icon-action"/>
            <q-fab-action @click="onClick('info')" label="Chi tiết" label-position="left" external-label color="primary"
                          icon="info" class="icon-action"/>
            <q-fab-action @click="onClick('edit')" label="Chỉnh sửa" label-position="left" external-label
                          color="primary" icon="edit" class="icon-action"/>
          </q-fab>
        </q-page-sticky>

        <div class="q-gutter-sm col-md-2 pagination-container">
          <!--      nút chuyển về trang đầu-->
          <!--        vô hiệu nút nếu đang ở trang 1-->
          <button style="cursor: pointer"
                  class="q-btn q-btn-item q-btn--flat q-btn--round text-primary q-btn--actionable"
                  :disabled="pagination.page === 1"
                  @click="goToFirstPage"
          >
            <i class="material-icons pagination-icon">keyboard_double_arrow_left</i>
          </button>
          <!--      nút chuyển đến trang trước -->

          <button style="cursor: pointer"
                  class="q-btn q-btn-item q-btn--flat q-btn--round text-primary q-btn--actionable"
                  :disabled="pagination.page === 1"
                  @click="goToPreviousPage"
          >
            <i class="material-icons pagination-icon">chevron_left</i>
          </button>
          <!--trang hiện tại-->
          <div class="q-pagination row no-wrap items-center">
            <div v-for="page in pageNumbers" :key="page">
              <button style="cursor: pointer;font-size: 10px;font-weight: 700;
  border-radius: 3px;"
                      v-if="page !== '...'"
                      class="q-btn q-btn-item"
                      :class="{
        'bg-primary text-white': pagination.page === page,
        'text-primary': pagination.page !== page,
      }"
                      @click="changePage(page)"
              >
                {{ page }}
              </button>
              <span v-else>...</span>
            </div>
          </div>
          <!--nút chuyển đến trang sau-->
          <!--      vô hiệu nếu đang ở trang cuối-->
          <button style="cursor: pointer"
                  class="q-btn q-btn-item q-btn--flat q-btn--round text-primary q-btn--actionable"
                  :disabled="pagination.page === totalPages"
                  @click="goToNextPage"
          >
            <i class="material-icons pagination-icon">chevron_right</i>
          </button>
          <!--nút chuyêển đến trang cuối cùng-->
          <button style="cursor: pointer"
                  class="q-btn q-btn-item q-btn--flat q-btn--round text-primary q-btn--actionable"
                  :disabled="pagination.page === totalPages"
                  @click="goToLastPage"
          >
            <i class="material-icons pagination-icon">keyboard_double_arrow_right</i>
          </button>
          <span style="font-size: 13px;">Trang</span>
          <!--      ô hiển thị trang hiện tại và nhập số trang-->
          <!--      min,max giới hạn chỉ có thể nhập số trong phạm vi từ 1 đến số trang cuối cùng.-->
          <q-input
            dense
            type="number"
            v-model.number="pagination.page"
            :min="1"
            :max="totalPages"
            style="width: 50px;"
            @change="fetchNetWorksList"
          />

          <!--chọn số lượng bản ghi muon hiển thị trên mỗi trang-->
          <q-select
            outlined
            dense
            v-model="pagination.rowsPerPage"
            :options="[5, 10, 15, 20, 25, 50]"


            @change="updateRowsPerPage"
          />
        </div>

      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script>
import axios from "axios";
import {useQuasar} from "quasar";

export default {
  name: "TableData",
  data() {
    return {
      isSearchTriggered: false,
      isSearchOpen: false,
      selectedIds: null,
      $q: useQuasar(),
      selected: [],
      lastIndex: null,
      tableRef: null,
      sort: {
        field: null,
        order: 'asc',
      },
      searchValues: '',
      confirmDialog: {
        visible: false,
        networkId: null,
      },
      searchValue: '',
      searchValueCable: '',
      searchDate: '',
      searchDate2: '',
      options: [
        {label: 'bằng', value: 'equal'},
        {label: 'chứa', value: 'contains'},
        {label: 'bắt đầu với', value: 'start_with'},
        {label: 'kết thúc với', value: 'end_with'},
        {label: 'khác', value: 'not_equal'},
      ],
      optionsDate: [
        {label: 'trong khoảng', value: 'during'},
        {label: 'bằng', value: 'equal'},
        {label: 'lớn hơn', value: 'bigger'},
        {label: 'bé hơn', value: 'smaller'},
        {label: 'lớn hơn hoặc bằng', value: 'greater_than_or_equal'},
        {label: 'bé hơn hoặc bằng', value: 'less_than_or_equal'},
      ],
      optionsCable: [
        {label: 'bằng', value: 'equal'},
        {label: 'gần bằng', value: 'contains'},

        {label: 'khác', value: 'not_equal'},
      ],
      filterTypeLink: 'equal',
      filterTypeCable: 'equal',
      filterTypeDate: 'during',
      search: false,
      filter: '',
      dialogVisible: false,
      departments: [],
      province: [],
      areas: [],
      port: [],

      networks: [],
      cables: [],
      status: [],
      device: [],
      formData: {

        ten_link_mang: null,
        cap: null,
        mang: null,
        cid: null,
        trang_thai: null,
        bang_thong_link_mbps: null,
        ten_thiet_bi_diem_dau: null,
        port_thiet_bi_diem_dau: null,
        ten_thiet_bi_diem_cuoi: null,
        port_thiet_bi_diem_cuoi: null,
        ten_odf_diem_dau: null,
        port_odf_diem_dau: null,
        tuyen_cap: null,
        khu_vuc: null,
        dia_chi_diem_dau: null,
        tinh_diem_dau: null,
        dia_chi_diem_cuoi: null,
        tinh_diem_cuoi: null,
        cidma_hop_dong_doi_tac: null,
        ngay_up_link: null,
        phongban_up_link: null,
        ngay_huy_link: null,
        phongban_huy_link: null,
        dau_moi_lien_he_doi_tac: null,
        thong_tin_ghi_chu: null
      },
      defaultFormData: {
        ten_link_mang: '',
        cap: '',
        mang: '',
        cid: '',
        trang_thai: '',
        bang_thong_link_mbps: '',
        ten_thiet_bi_diem_dau: '',
        port_thiet_bi_diem_dau: '',
        ten_thiet_bi_diem_cuoi: '',
        port_thiet_bi_diem_cuoi: '',
        ten_odf_diem_dau: '',
        port_odf_diem_dau: '',
        tuyen_cap: '',
        khu_vuc: '',
        dia_chi_diem_dau: '',
        tinh_diem_dau: '',
        dia_chi_diem_cuoi: '',
        tinh_diem_cuoi: '',
        cidma_hop_dong_doi_tac: '',
        ngay_up_link: '',
        phongban_up_link: '',
        ngay_huy_link: '',
        phongban_huy_link: '',
        dau_moi_lien_he_doi_tac: '',
        thong_tin_ghi_chu: ''
      },
      lastPage: 0,
      lastQuery: "",

      loading: false,
      currentPage: 0,
      itemsPerPage: 20,
      fixed: false,
      created: false,
      currentNetwork: {},
      total: 0,
      networksList: [],
      // rowsPerPage: Số bản ghi hiển thị trên mỗi trang, mặc định là 50.
      // rowsNumber: Tổng số bản ghi (được cập nhật từ dữ liệu API trả về).
      pagination: {
        page: 1,
        rowsPerPage: 50,

        rowsNumber: 0,
      },
      columns: [

        {name: 'tt', label: 'TT', required: true, align: 'left', field: 'tt'},
        {name: 'tenLinkMang', label: 'Tên Link Mạng', field: 'tenLinkMang', align: 'left'},
        {name: 'cap', label: 'Cáp', field: 'cap', align: 'left'},
        {name: 'mang', label: 'Mạng', field: 'mang', align: 'left'},
        {name: 'cid', label: 'CID', field: 'cid', align: 'left'},
        {name: 'trangThai', label: 'Trạng thái', field: 'trangThai', align: 'left'},
        {name: 'bangThong', label: 'Băng Thông (Mbps)', field: 'bangThong', align: 'left'},
        {name: 'tenThietBiDiemDau', label: 'Tên thiết bị điểm đầu', field: 'tenThietBiDiemDau', align: 'left'},
        {name: 'portThietBiDiemDau', label: 'Port thiết bị điểm đầu', field: 'portThietBiDiemDau', align: 'left'},
        {name: 'tenThietBiDiemCuoi', label: 'Tên thiết bị điểm cuối', field: 'tenThietBiDiemCuoi', align: 'left'},
        {name: 'portThietBiDiemCuoi', label: 'Port thiết bị điểm cuối', field: 'portThietBiDiemCuoi', align: 'left'},
        {name: 'tenOdfDiemDau', label: 'Tên ODF điểm đầu', field: 'tenOdfDiemDau', align: 'left'},
        {name: 'portOdfDiemDau', label: 'Port ODF điểm đầu', field: 'portOdfDiemDau', align: 'left'},
        {name: 'tuyenCap', label: 'Tuyến cáp', field: 'tuyenCap', align: 'left'},
        {name: 'khuVuc', label: 'Khu vực', field: 'khuVuc', align: 'left'},
        {name: 'diaChiDiemDau', label: 'Địa chỉ điểm đầu', field: 'diaChiDiemDau', align: 'left'},
        {name: 'tinhDiemDau', label: 'Tỉnh điểm đầu', field: 'tinhDiemDau', align: 'left'},
        {name: 'diaChiDiemCuoi', label: 'Địa chỉ điểm cuối', field: 'diaChiDiemCuoi', align: 'left'},
        {name: 'tinhDiemCuoi', label: 'Tỉnh điểm cuối', field: 'tinhDiemCuoi', align: 'left'},
        {name: 'cidmaHopDongDoiTac', label: 'CIDMA Hợp đồng đối tác', field: 'cidmaHopDongDoiTac', align: 'left'},
        {name: 'ngayUpLink', label: 'Ngày up link', field: 'ngayUpLink', align: 'left'},
        {name: 'phongbanUpLink', label: 'Phòng ban up link', field: 'phongbanUpLink', align: 'left'},
        {name: 'ngayHuyLink', label: 'Ngày hủy link', field: 'ngayHuyLink', align: 'left'},
        {name: 'phongbanHuyLink', label: 'Phòng ban hủy link', field: 'phongbanHuyLink', align: 'left'},
        {name: 'dauMoiLienHeDoiTac', label: 'Đầu mối liên hệ đối tác', field: 'dauMoiLienHeDoiTac', align: 'left'},
        {name: 'ghiChu', label: 'Ghi chú', field: 'ghiChu', align: 'left'},

      ],
      rows: [],
    };
  },
  computed: {
    pageNumbers() {
      const totalPages = this.totalPages;
      const currentPage = this.pagination.page;
      const maxVisiblePages = 5; // Số trang hiển thị tối đa trong thanh phân trang
      const pages = [];

      if (totalPages <= maxVisiblePages) {
        // Hiển thị tất cả các trang nếu số trang nhỏ hơn maxVisiblePages
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          // Trang đầu: Hiển thị 1, 2, 3, ..., n
          for (let i = 1; i <= maxVisiblePages - 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          // Trang cuối: Hiển thị 1, ..., n-2, n-1, n
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          // Ở giữa: Hiển thị 1, ..., x-1, x, x+1, ..., n
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        }
      }

      return pages;
    },
    // Tính tổng số trang dựa trên tổng số bản ghi (rowsNumber) và số bản ghi trên mỗi trang (rowsPerPage).
    totalPages() {
      return Math.ceil(this.pagination.rowsNumber / this.pagination.rowsPerPage);
    },
  },
  methods: {

    toggleSearchBox() {
      this.isSearchOpen = !this.isSearchOpen;
      if (this.isSearchOpen) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus(); // Tự động focus vào input khi mở
        });
      }
     else {
      this.fetchNetWorksList();
    }
    },
    onClick(actionType) {
      if (this.selectedIds === null) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Vui lòng chọn ít nhất một hàng để thao tác!',
          icon: 'warning',
        });
        return;
      }

      switch (actionType) {
        case 'delete':
          this.openDeleteConfirm(this.selectedIds);
          break;
        case 'info':
          this.infoNetwork(this.selectedIds);
          break;
        case 'edit':
          this.showItem(this.selectedIds);
          break;
        default:
          break;
      }
    },

    getSelectedString() {
      const count = this.selected.length;
      return count === 0
        ? 'Đang chọn 0 bản ghi'
        : `Đang chọn ${count} bản ghi`;
    },
    onSelection({rows, added, evt}) {
      if (rows.length === 0 || this.tableRef === void 0) {
        return;
      }
      console.log("hàng", rows);
      if (rows.length > 0) {

        // Lưu ID của hàng đầu tiên trong mảng rows

        this.selectedIds = rows[0].id;

      } else {

        this.selectedId = null; // Nếu không có hàng nào được chọn, đặt lại thành null

      }
      console.log("ID là", this.selectedIds)
      const row = rows[0];
      const filteredSortedRows = this.tableRef.filteredSortedRows;
      const rowIndex = filteredSortedRows.indexOf(row);
      const localLastIndex = this.lastIndex;

      this.lastIndex = rowIndex;
      document.getSelection().removeAllRanges();

      if (this.$q.platform.is.mobile === true) {
        evt = {ctrlKey: true};
      } else if (evt !== Object(evt) || (evt.shiftKey !== true && evt.ctrlKey !== true)) {
        this.selected = added === true ? rows : [];
        return;
      }

      const operateSelection = added === true
        ? selRow => {
          const selectedIndex = this.selected.indexOf(selRow);
          if (selectedIndex === -1) {
            this.selected = this.selected.concat(selRow);
          }
        }
        : selRow => {
          const selectedIndex = this.selected.indexOf(selRow);
          if (selectedIndex > -1) {
            this.selected = this.selected.slice(0, selectedIndex).concat(this.selected.slice(selectedIndex + 1));
          }
        };

      if (localLastIndex === null || evt.shiftKey !== true) {
        operateSelection(row);
        return;
      }

      const from = localLastIndex < rowIndex ? localLastIndex : rowIndex;
      const to = localLastIndex < rowIndex ? rowIndex : localLastIndex;
      for (let i = from; i <= to; i += 1) {
        operateSelection(filteredSortedRows[i]);
      }
    },
    async showItem(networkId) {
      try {
        this.dialogVisible = true;
        await this.infoEdit(networkId);
        this.formData = {...this.currentNetwork};
      } catch (error) {
        console.error("Lỗi khi lấy thông tin mạng:", error);
      }
    },

    sortRows(field) {
      // Nếu người dùng nhấp vào cột khác
      if (this.sort.field !== field) {
        // Đặt cột trước đó về trạng thái tăng dần
        if (this.sort.field) {
          this.sort = {field: this.sort.field, order: 'asc'}; // Đặt cột cũ về tăng dần
        }
        // Thiết lập cột mới và đặt là tăng dần
        this.sort = {field, order: 'asc'};
      } else {
        // Nếu nhấp vào cùng một cột, thay đổi thứ tự
        this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
      }

      // Sắp xếp dữ liệu
      this.rows.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        return this.sort.order === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      });
    }, handleCancel() {
      this.fetchNetWorksList();
    },
    changePage(page) {
      if (page !== '...') {
        this.pagination.page = page;
        this.fetchNetWorksList();
      }
    },
    async updateLinkMang(currentId) {
      if (!this.formData.ten_link_mang || !this.formData.cap || !this.formData.mang ||

        !this.formData.cid || !this.formData.trang_thai || !this.formData.bang_thong_link_mbps ||

        !this.formData.port_thiet_bi_diem_dau ||

        !this.formData.port_thiet_bi_diem_cuoi ||

        !this.formData.ten_odf_diem_dau || !this.formData.port_odf_diem_dau ||

        !this.formData.tuyen_cap || !this.formData.khu_vuc || !this.formData.dia_chi_diem_dau ||

        !this.formData.tinh_diem_dau || !this.formData.dia_chi_diem_cuoi ||

        !this.formData.tinh_diem_cuoi || !this.formData.cidma_hop_dong_doi_tac ||

        !this.formData.ngay_up_link || !this.formData.phongban_up_link ||

        !this.formData.ngay_huy_link || !this.formData.phongban_huy_link ||

        !this.formData.dau_moi_lien_he_doi_tac || !this.formData.thong_tin_ghi_chu) {

        this.$q.notify({

          color: 'negative',

          message: 'Vui lòng điền đầy đủ thông tin bắt buộc!',

          icon: 'warning'

        });

        return; // Dừng lại nếu có trường không hợp lệ

      }
      const payload = [
        {"field": "_id", "value": this.formData._id}, {
          "field": "ten_link_mang",
          "value": this.formData.ten_link_mang
        }, {
          "field": "cap",
          "value": {
            "label": this.formData.cap.label,
            "value": this.formData.cap.label,
            "data_source": "danhmuc_dhm_cap_list",
            "view_to_open_link": null,
            "display_member": "ten",
            "value_member": "ten"
          }
        }, {
          "field": "mang",
          "value": {
            "label": this.formData.mang.label,
            "value": this.formData.mang.label,
            "data_source": "danhmuc_dhm_mang_list",
            "view_to_open_link": null,
            "display_member": "ten",
            "value_member": "ten"
          }
        }, {"field": "cid", "value": this.formData.cid}, {
          "field": "trang_thai",
          "value": {
            "label": this.formData.trang_thai.label,
            "value": this.formData.trang_thai.label,
            "data_source": "danhmuc_dhm_trangthai_list",
            "view_to_open_link": null,
            "display_member": "ten",
            "value_member": "ten"
          }
        }, {"field": "bang_thong_link_mbps", "value": this.formData.bang_thong_link_mbps}, {
          "field": "ten_odf_diem_dau",
          "value": this.formData.ten_odf_diem_dau
        }, {"field": "port_odf_diem_dau", "value": this.formData.port_odf_diem_dau}, {
          "field": "tuyen_cap",
          "value": this.formData.tuyen_cap
        }, {
          "field": "khu_vuc",
          "value": {
            "label": this.formData.khu_vuc.label,
            "value": this.formData.khu_vuc.label,
            "data_source": "danhmuc_dhm_khuvuc_list",
            "view_to_open_link": null,
            "display_member": "ten",
            "value_member": "ten"
          }
        }, {"field": "dia_chi_diem_dau", "value": this.formData.dia_chi_diem_dau}, {
          "field": "tinh_diem_dau",
          "value": {
            "label": this.formData.tinh_diem_dau.label,
            "value": this.formData.tinh_diem_dau.label,
            "data_source": "danhmuc_dhm_tinh_list",
            "view_to_open_link": null,
            "display_member": "ten",
            "value_member": "ten"
          }
        }, {"field": "dia_chi_diem_cuoi", "value": this.formData.dia_chi_diem_cuoi}, {
          "field": "tinh_diem_cuoi",
          "value": {
            "label": this.formData.tinh_diem_cuoi.label,
            "value": this.formData.tinh_diem_cuoi.label,
            "data_source": "danhmuc_dhm_tinh_list",
            "view_to_open_link": null,
            "display_member": "ten",
            "value_member": "ten"
          }
        }, {"field": "cidma_hop_dong_doi_tac", "value": this.formData.cidma_hop_dong_doi_tac}, {
          "field": "ngay_up_link",
          "value": this.formData.ngay_up_link,
        }, {
          "field": "phongban_up_link",
          "value": {
            "label": this.formData.phongban_up_link.label,
            "value": this.formData.phongban_up_link.label,
            "data_source": "danhmuc_dhm_phongbanuplink_list",
            "view_to_open_link": null,
            "display_member": "ten",
            "value_member": "ten"
          }
        }, {
          "field": "phongban_huy_link",
          "value": {
            "objectValue": [],
            "option": {
              "_id": this.formData.phongban_up_link._id,
              "ten": this.formData.phongban_up_link.label
            },
            "label": this.formData.phongban_up_link.label,
            "value": this.formData.phongban_up_link.label
          }
        }, {"field": "ngay_huy_link", "value": this.formData.ngay_huy_link}, {
          "field": "dau_moi_lien_he_doi_tac",
          "value": this.formData.dau_moi_lien_he_doi_tac
        }, {"field": "thong_tin_ghi_chu", "value": this.formData.thong_tin_ghi_chu}, {
          "field": "loai_danh_sach",
          "value": 0
        }, {
          "field": "tt",
          "value": this.formData.tt
        }]

      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `https://apidev.hitc.vn/moappapiv2/api/data/dhm_danhsachlinkmang_update/update-by-id/${this.formData._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log('Update successful:', response.data);

          this.$q.notify({
            color: 'positive',
            message: 'Sửa thành công!',
            icon: 'check_circle'
          });

          this.dialogVisible = false;
          this.fetchNetWorksList();
        }


        this.dialogVisible = false;
      } catch (error) {
        console.error('Error:', error);
        alert("Loi rui")
      }
    },

    formatDates(dateString) {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(dateString)) {
        throw new Error(`${dateString} không phải là định dạng ngày tháng hợp lệ (DD/MM/YYYY)`);
      }

      const parts = dateString.split('/');
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];

      return `${year}-${month}-${day}`;
    },

    getOperator(filterTypeLink) {
      console.log("Filter Type:", filterTypeLink);
      switch (filterTypeLink) {
        case 'equal':
          return '==';
        case 'contains':
          return 'like';
        case 'start_with':
          return 'start_with';
        case 'end_with':
          return 'end_with';
        case 'not_equal':
          return '!=';
        default:
          return '';
      }
    },
    getOperatorCable(filterTypeCable) {
      console.log("Filter Type:", filterTypeCable);
      switch (filterTypeCable) {
        case 'equal':
          return '==';
        case 'contains':
          return 'like';

        case 'not_equal':
          return '!=';
        default:
          return '';
      }
    },
    getOperatorDate(filterTypeDate) {
      console.log("Filter Type:", filterTypeDate);
      switch (filterTypeDate) {
        case 'equal':
          return '==';
        case 'during':
          return 'between';
        case 'bigger':
          return '>';
        case 'smaller':
          return '<';
        case 'greater_than_or_equal':
          return '>=';
        case 'less_than_or_equal':
          return '<=';
        default:
          return '';
      }
    },
    openDialog() {
      this.formData = {...this.defaultFormData};
      this.created = true;
    },

    //----------- Thêm dữ liệu---------------
    async submitForm() {
// Kiểm tra xem tất cả các trường bắt buộc đã được nhập

      if (!this.formData.ten_link_mang || !this.formData.cap || !this.formData.mang ||

        !this.formData.cid || !this.formData.trang_thai || !this.formData.bang_thong_link_mbps ||

        !this.formData.ten_thiet_bi_diem_dau || !this.formData.port_thiet_bi_diem_dau ||

        !this.formData.ten_thiet_bi_diem_cuoi || !this.formData.port_thiet_bi_diem_cuoi ||

        !this.formData.ten_odf_diem_dau || !this.formData.port_odf_diem_dau ||

        !this.formData.tuyen_cap || !this.formData.khu_vuc || !this.formData.dia_chi_diem_dau ||

        !this.formData.tinh_diem_dau || !this.formData.dia_chi_diem_cuoi ||

        !this.formData.tinh_diem_cuoi || !this.formData.cidma_hop_dong_doi_tac ||

        !this.formData.ngay_up_link || !this.formData.phongban_up_link ||

        !this.formData.ngay_huy_link || !this.formData.phongban_huy_link ||

        !this.formData.dau_moi_lien_he_doi_tac || !this.formData.thong_tin_ghi_chu) {

        this.$q.notify({

          color: 'negative',

          message: 'Vui lòng điền đầy đủ thông tin bắt buộc!',

          icon: 'warning'

        });

        return;

      }

      const payload = {
        bang_thong_link_mbps: this.formData.bang_thong_link_mbps,
        cap: {
          label: this.formData.cap.label,
          objectValue: this.formData.cap.objectValue,
          option: {
            _id: this.formData.cap._id,
            ten: this.formData.cap.ten
          },
          value: this.formData.cap.label
        },
        cid: this.formData.cid,
        cidma_hop_dong_doi_tac: this.formData.cidma_hop_dong_doi_tac,
        dau_moi_lien_he_doi_tac: this.formData.dau_moi_lien_he_doi_tac,
        dia_chi_diem_cuoi: this.formData.dia_chi_diem_cuoi,
        dia_chi_diem_dau: this.formData.dia_chi_diem_dau,
        khu_vuc: {
          label: this.formData.khu_vuc.label,
          objectValue: this.formData.khu_vuc.objectValue,
          option: {
            _id: this.formData.khu_vuc._id,
            ten: this.formData.khu_vuc.ten
          },
          value: this.formData.khu_vuc.label
        },
        loai_danh_sach: this.formData.loaiDanhSach,
        mang: {
          label: this.formData.mang.label,
          objectValue: this.formData.mang.objectValue,
          option: {
            _id: this.formData.mang._id,
            ten: this.formData.mang.ten
          },
          value: this.formData.mang.label
        },
        ngay_huy_link: this.formData.ngay_huy_link,
        ngay_up_link: this.formData.ngay_up_link,
        phongban_huy_link: {
          label: this.formData.phongban_huy_link.label,
          objectValue: this.formData.phongban_huy_link.objectValue,
          option: {
            _id: this.formData.phongban_huy_link._id,
            ten: this.formData.phongban_huy_link.ten
          },
          value: this.formData.phongban_huy_link.label
        },
        phongban_up_link: {
          label: this.formData.phongban_up_link.label,
          objectValue: this.formData.phongban_up_link.objectValue,
          option: {
            _id: this.formData.phongban_up_link._id,
            ten: this.formData.phongban_up_link.ten
          },
          value: this.formData.phongban_up_link.label
        },
        port_odf_diem_dau: this.formData.port_odf_diem_dau,
        port_thiet_bi_diem_cuoi: {
          label: this.formData.port_thiet_bi_diem_cuoi.label,
          objectValue: this.formData.port_thiet_bi_diem_cuoi.objectValue,
          option: {
            _id: this.formData.port_thiet_bi_diem_cuoi._id,
            ten_port: this.formData.port_thiet_bi_diem_cuoi.ten_port
          },
          value: this.formData.port_thiet_bi_diem_cuoi.label
        },
        port_thiet_bi_diem_dau: {
          label: this.formData.port_thiet_bi_diem_dau.label,
          objectValue: this.formData.port_thiet_bi_diem_dau.objectValue,
          option: {
            _id: this.formData.port_thiet_bi_diem_dau._id,
            ten_port: this.formData.port_thiet_bi_diem_dau.ten_port
          },
          value: this.formData.port_thiet_bi_diem_dau.label
        },
        ten_link_mang: this.formData.ten_link_mang,
        ten_odf_diem_dau: this.formData.ten_odf_diem_dau,
        ten_thiet_bi_diem_cuoi: {
          label: this.formData.ten_thiet_bi_diem_cuoi.label,
          objectValue: this.formData.ten_thiet_bi_diem_cuoi.objectValue,
          option: {
            _id: this.formData.ten_thiet_bi_diem_cuoi._id,
            ten_thiet_bi: this.formData.ten_thiet_bi_diem_cuoi.ten_thiet_bi
          },
          value: this.formData.ten_thiet_bi_diem_cuoi.label
        },
        ten_thiet_bi_diem_dau: {
          label: this.formData.ten_thiet_bi_diem_dau.label,
          objectValue: this.formData.ten_thiet_bi_diem_dau.objectValue,
          option: {
            _id: this.formData.ten_thiet_bi_diem_dau._id,
            stt: this.formData.ten_thiet_bi_diem_dau.stt,
            ten_thiet_bi: this.formData.ten_thiet_bi_diem_dau.ten_thiet_bi
          },
          value: this.formData.ten_thiet_bi_diem_dau.value
        },
        thong_tin_ghi_chu: this.formData.thong_tin_ghi_chu,
        tinh_diem_cuoi: {
          label: this.formData.tinh_diem_cuoi.label,
          objectValue: this.formData.tinh_diem_cuoi.objectValue,
          option: {
            _id: this.formData.tinh_diem_cuoi._id,
            ten: this.formData.tinh_diem_cuoi.ten
          },
          value: this.formData.tinh_diem_cuoi.label
        },
        tinh_diem_dau: {
          label: this.formData.tinh_diem_dau.label,
          objectValue: this.formData.tinh_diem_dau.objectValue,
          option: {
            _id: this.formData.tinh_diem_dau._id,
            ten: this.formData.tinh_diem_dau.ten
          },
          value: this.formData.tinh_diem_dau.label
        },
        trang_thai: {
          label: this.formData.trang_thai.label,
          objectValue: this.formData.trang_thai.objectValue,
          option: {
            _id: this.formData.trang_thai._id,
            ten: this.formData.trang_thai.ten
          },
          value: this.formData.trang_thai.label
        },
        tuyen_cap: this.formData.tuyen_cap
      };


      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          'https://apidev.hitc.vn/moappapiv2/api/data/dhm_danhsachlinkmang_insert/insert',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          this.networksList.push(response.data);
          console.log("Dữ liệu mới", response.data);
          this.created = false;
          this.$q.notify({
            color: 'positive',
            message: 'Thêm thành công!',
            icon: 'check_circle'
          });

        }

        this.created = false;
        this.resetForm();
      } catch (error) {
        console.error('Error:', error);
        alert("Loi rui")
      }
    },
    resetForm() {
      this.formData = {
        ten_link_mang: '',
        cap: null,
        mang: null,
        cid: '',
        trang_thai: null,
        bang_thong_link_mbps: null,
        ten_thiet_bi_diem_dau: null,
        port_thiet_bi_diem_dau: null,
        ten_thiet_bi_diem_cuoi: null,
        port_thiet_bi_diem_cuoi: null,
        ten_odf_diem_dau: '',
        port_odf_diem_dau: '',
        tuyen_cap: '',
        khu_vuc: null,
      };
    },
// hàm chuyển chuỗi ngày tháng theo định dạng ISO=) dd/mm/yyyy
    formatDate(dateString) {
      const date = new Date(dateString.split("T")[0]);
      const day = ("0" + date.getDate()).slice(-2);  // Đảm bảo ngày có 2 chữ số
      const month = ("0" + (date.getMonth() + 1)).slice(-2);  // Tháng từ 0-11, cộng thêm 1
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async fetchDepartments(query = "") {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `https://apidev.hitc.vn/moappapiv2/api/data/danhmuc_dhm_phongbanuplink_list/paging-combobox`,
          {
            condition: query
              ? [
                {
                  field: "ten",
                  logical_oper: "OR",
                  oper: "like",
                  value: query,
                },
              ]
              : [],
            projection: {
              field: ["ten", "ten"],
            },
            page: this.currentPage,
            size: this.itemsPerPage,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data) {
          // Ánh xạ dữ liệu từ API thành danh sách khu vực
          this.departments = response.data.data.map((item) => ({
            label: item.ten,
            value: item._id,
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy phòng ban:", error);
      }
    },
    filterFnDepartment(val, update) {
      update(() => {
        this.currentPage = 1;
        this.fetchDepartments(val);
        console.log('dữ liệu phòng ban up link', this.formData);
      });
    },

    async fetchAreas(query = "") {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `https://apidev.hitc.vn/moappapiv2/api/data/danhmuc_dhm_khuvuc_list/paging-combobox`,
          {
            condition: query
              ? [
                {
                  field: "ten",
                  logical_oper: "OR",
                  oper: "like",
                  value: query,
                },
              ]
              : [],
            projection: {
              field: ["ten", "ten"],
            },
            page: this.currentPage,
            size: this.itemsPerPage,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data) {
          // Ánh xạ dữ liệu từ API thành danh sách khu vực
          this.areas = response.data.data.map((item) => ({
            label: item.ten,
            value: item._id,
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy khu vực:", error);
      }
    },
    filterFnAreas(val, update) {
      update(() => {
        this.currentPage = 1;
        this.fetchAreas(val);
        console.log('dữ liệu khu vực', this.formData);
      });
    },

    async fetchPort(query = '') {
      try {


        const token = localStorage.getItem("token");
        const response = await axios.post(
          `https://apidev.hitc.vn/moappapiv2/api/data/dhm_cauhinhportthietbi_list/paging-combobox`,
          {
            condition: query
              ? [
                {
                  field: "ten_port",
                  logical_oper: "OR",
                  oper: "like",
                  value: query,
                },
              ]
              : [],
            projection: {
              field: ["ten_port", "ten_port"],
            },
            page: this.currentPage,
            size: this.itemsPerPage,
            sort: [],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.data) {
          // Ánh xạ dữ liệu từ API thành danh sách khu vực
          this.port = response.data.data.map((item) => ({
            label: item.ten_port,
            value: item._id,
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy port:", error);
      }
    },
    filterFnPort(val, update) {
      update(() => {
        this.currentPage = 1;
        this.fetchPort(val);
        console.log('dữ liệu port TBDV', this.formData);
      });
    },

    async fetchDevice(query = "", append = false) {
      // append quyết định xem dữ liệu lấy về có được thêm vào cuối danh sách hiện tại hay không.
      try {
        this.loading = true;

        const token = localStorage.getItem("token");
        const response = await axios.post(
          `https://apidev.hitc.vn/moappapiv2/api/data/dhm_danhsachthietbi_list/paging-combobox`,
          {
            condition: query
              ? [
                {
                  field: "ten_thiet_bi",
                  logical_oper: "OR",
                  oper: "like",
                  value: query,
                },
              ]
              : [],
            projection: {
              field: ["stt", "ten_thiet_bi"],
            },
            page: this.currentPage,
            size: this.itemsPerPage,
            sort: [],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data) {
          // Cập nhật số trang cuối
          this.lastPage = Math.ceil(response.data.total / this.itemsPerPage);
          console.log("tổng số bản ghi thiêết bị", response.data.total);
          console.log("sl bản ghi mỗi trang", this.itemsPerPage);

          console.log("Số trang cuối của list thiết bị: ", this.lastPage);

          // Chuyển đổi dữ liệu
          const newOptions = response.data.data.map((item) => ({
            label: item.ten_thiet_bi,
            value: item.stt,
          }));

          // Xử lý dữ liệu dựa trên chế độ append
          if (!append) {
            // Tìm kiếm: Thay thế dữ liệu cũ
            this.device = newOptions;
          } else {
            // Cuộn xuống: Thêm dữ liệu mới vào cuối danh sách
            this.device = [...this.device, ...newOptions];
          }
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        this.loading = false;
      }
    }
    ,

    onScroll({to, ref}) {
      console.log("Sự kiện cuộn được kích hoạt");
      const lastIndex = this.device.length - 1;  // Lấy chỉ số của phần tử cuối cùng trong danh sách
      console.log("Chỉ số cuối cùng: ", lastIndex);
      console.log("Vị trí cuộn tới: ", to);  // Vị trí cuộn hiện tại

      // Kiểm tra khi cuộn đến cuối danh sách
      if (!this.loading && this.currentPage <= this.lastPage && to + 1 >= lastIndex) {
        this.currentPage++;  // Tăng số trang tiếp theo
        this.fetchDevice(this.lastQuery, true);  // Gọi lại fetchDevice để lấy dữ liệu cho trang tiếp theo
        this.$nextTick(() => {
          ref.refresh();  // Làm mới scroll để cập nhật
        });
      }
      console.log('Số trang hiện tại', this.currentPage)
    },

    filterFnDevice(val, update) {
      update(() => {
        this.currentPage = 1;  // Đặt lại trang về 1 khi tìm kiếm
        this.lastQuery = val;  // Lưu lại từ khóa tìm kiếm
        this.device = []; // Reset dữ liệu hiện tại
        this.fetchDevice(val); // Gọi lại API với từ khóa tìm kiếm mới
      });
    },
    async fetchProvince(query = "", append = false) {
      try {
        this.loading = true;

        const token = localStorage.getItem("token");
        const requestPayload = {
          condition: query
            ? [
              {
                field: "ten",
                logical_oper: "OR",
                oper: "like",
                value: query,
              },
            ]
            : [],
          sort: [],
          projection: {
            field: ["ten", "ten"], // Trùng lặp có thể là do yêu cầu API
          },
          page: this.currentPage,
          size: this.itemsPerPage,
        };

        const response = await axios.post(
          `https://apidev.hitc.vn/moappapiv2/api/data/danhmuc_dhm_tinh_list/paging`,
          requestPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data) {
          // Cập nhật số trang cuối dựa trên tổng số bản ghi và pageSize
          this.lastPage = Math.ceil(response.data.total / this.itemsPerPage);
          console.log("Số trang cuối: ", this.lastPage);

          // Cập nhật các lựa chọn mới vào options
          const newOptions = response.data.data.map((item) => ({
            label: item.ten,
            value: item._id,
          }));

          // Nếu tìm kiếm (append = false), reset dữ liệu trước khi thêm
          if (!append) {
            this.province = newOptions;
          } else {
            // Nếu cuộn xuống, chỉ thêm dữ liệu mới vào cuối danh sách
            this.province = [...this.province, ...newOptions];
          }
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        this.loading = false;
      }
    },

    onScrollProvince({to, ref}) {
      const lastIndex = this.province.length - 1;

      // Kiểm tra khi cuộn đến cuối danh sách
      if (!this.loading && this.currentPage < this.lastPage && to + 1 >= lastIndex) {
        this.currentPage++; // Tăng trang hiện tại
        this.fetchProvince(this.lastQuery, true); // Gọi API với từ khóa hiện tại
        this.$nextTick(() => {
          ref.refresh(); // Làm mới scroll để cập nhật
        });
      }
    },


    filterFnProvince(val, update) {
      update(() => {
        this.currentPage = 1;  // Đặt lại trang về 1 khi tìm kiếm
        this.lastQuery = val;  // Lưu lại từ khóa tìm kiếm
        this.province = []; // Reset dữ liệu hiện tại
        this.fetchProvince(val); // Gọi lại API với từ khóa tìm kiếm mới
      });
    },

// Lấy ra danh sách cáp + nếu có điều kiện thì sẽ tìm kiếm cáp
    async fetchCables(query = "") {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `https://apidev.hitc.vn/moappapiv2/api/data/danhmuc_dhm_cap_list/paging-combobox`,
          {
            condition: query
              ? [
                {
                  field: "ten",
                  logical_oper: "OR",
                  oper: "like",
                  value: query,
                },
              ]
              : [],
            sort: [],
            projection: {
              field: ["ten", "ten"],
            },
            page: this.currentPage,
            size: this.itemsPerPage,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data) {
          // Ánh xạ dữ liệu từ API thành danh sách cáp với định dạng phù hợp
          this.cables = response.data.data.map((item) => ({
            label: item.ten,
            value: item.ten,
            option: item, // Lưu toàn bộ đối tượng để sử dụng sau này
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy cáp:", error);
      }
    },
    filterFn(val, update) {
      update(() => {
        this.currentPage = 1;
        this.fetchCables(val);
        console.log('dữ liệu', this.formData);
      });
    },
    async fetchNetWorks(query = "") {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `https://apidev.hitc.vn/moappapiv2/api/data/danhmuc_dhm_mang_list/paging-combobox`,
          {
            condition: query
              ? [
                {
                  field: "ten",
                  logical_oper: "OR",
                  oper: "like",
                  value: query,
                },
              ]
              : [],
            projection: {
              field: ["ten", "ten"],
            },
            page: this.currentPage,
            size: this.itemsPerPage,
            sort: [],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data) {
          // Ánh xạ dữ liệu trả về từ API
          this.networks = response.data.data.map((item) => ({
            label: item.ten,
            value: item._id,
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy mạng:", error);
      }
    },
    // cập nhật dữ liệu và trạng thái của trang khi người dùng thay đổi bộ lọc tìm kiếm.
    filterFnNetworks(val, update) {
      update(() => {
        this.currentPage = 1;
        this.fetchNetWorks(val);
        console.log('dữ liệu mạng', this.formData);
      });
    },

    async statusList(query = "") {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `https://apidev.hitc.vn/moappapiv2/api/data/danhmuc_dhm_trangthai_list/paging-combobox`,
          {
            condition: query
              ? [
                {
                  field: "ten",
                  logical_oper: "OR",
                  oper: "like",
                  value: query,
                },
              ]
              : [],
            projection: {
              field: ["ten", "ten"],
            },
            page: this.currentPage,
            size: this.itemsPerPage,
            sort: [],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data) {
          // Ánh xạ dữ liệu trả về
          this.status = response.data.data.map((item) => ({
            label: item.ten,
            value: item._id,
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy trạng thái:", error);
      }
    }
    ,
    filterFnStatus(val, update) {
      update(() => {
        this.currentPage = 1;
        this.statusList(val);
        console.log('dữ liệu trạng thái', this.formData);
      });
    },
// hàm lấy ra các bản ghi
    async fetchNetWorksList(condition = null) {
      try {
        const token = localStorage.getItem("token");
        // chứa tất cả các thông tin mà API cần để xử lý yêu cầu, bao gồm các điều kiện lọc, thông tin phân trang, và các trường dữ liệu cần lấy .
        const payload = {
          condition: Array.isArray(condition) ? condition : [],
          // trang hiện tại
          page: this.pagination.page,
          // số lượng bản ghi cần hiển thị mỗi trang
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
        }

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
          this.total = response.data.total;
          this.networksList = response.data.data;
          this.pagination.rowsNumber = response.data.total;
          this.rows = this.networksList.map((item) => ({
            id: item._id,
            tt: item.tt,
            tenLinkMang: item.ten_link_mang,
            cap: item.cap ? item.cap.value : '',
            mang: item.mang ? item.mang.value : '',
            cid: item.cid,
            trangThai: item.trang_thai ? item.trang_thai.value : '',
            bangThong: item.bang_thong_link_mbps.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
            //   minimumFractionDigits: 2: Đảm bảo rằng có ít nhất 2 chữ số thập phân (nếu số có ít hơn 2 chữ số thập phân, sẽ được thêm số 0 vào).
            // maximumFractionDigits: 2: Giới hạn số chữ số thập phân tối đa là 2. Nếu số có nhiều hơn 2 chữ số thập phân, thì chỉ giữ lại 2 chữ số đầu.
            tenThietBiDiemDau: item.ten_thiet_bi_diem_dau ? item.ten_thiet_bi_diem_dau.value : '',
            portThietBiDiemDau: item.port_thiet_bi_diem_dau ? item.port_thiet_bi_diem_dau.value : '',
            tenThietBiDiemCuoi: item.ten_thiet_bi_diem_cuoi ? item.ten_thiet_bi_diem_cuoi.value : '',
            portThietBiDiemCuoi: item.port_thiet_bi_diem_cuoi ? item.port_thiet_bi_diem_cuoi.value : '',
            tenOdfDiemDau: item.ten_odf_diem_dau ? item.ten_odf_diem_dau : '',
            portOdfDiemDau: item.port_odf_diem_dau ? item.port_odf_diem_dau : '',
            tuyenCap: item.tuyen_cap ? item.tuyen_cap : '',
            khuVuc: item.khu_vuc ? item.khu_vuc.value : '',
            diaChiDiemDau: item.dia_chi_diem_dau ? item.dia_chi_diem_dau : '',
            tinhDiemDau: item.tinh_diem_dau ? item.tinh_diem_dau.value : '',
            diaChiDiemCuoi: item.dia_chi_diem_cuoi ? item.dia_chi_diem_cuoi : '',
            tinhDiemCuoi: item.tinh_diem_cuoi ? item.tinh_diem_cuoi.value : '',
            cidmaHopDongDoiTac: item.cidma_hop_dong_doi_tac ? item.cidma_hop_dong_doi_tac : '',
            ngayUpLink: item.ngay_up_link ? this.formatDate(item.ngay_up_link) : null,
            phongbanUpLink: item.phongban_up_link ? item.phongban_up_link.value : '',
            ngayHuyLink: item.ngay_huy_link ? this.formatDate(item.ngay_huy_link) : null,
            phongbanHuyLink: item.phongban_huy_link ? item.phongban_huy_link.value : '',
            dauMoiLienHeDoiTac: item.dau_moi_lien_he_doi_tac ? item.dau_moi_lien_he_doi_tac : '',
            thongTinGhiChu: item.thong_tin_ghi_chu ? item.thong_tin_ghi_chu : '',

          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }

    },
    async searchNetworks() {
      const operator = this.getOperator(this.filterTypeLink);
      console.log("toán tử được trả về là", this.filterTypeLink);
      const operatorCables = this.getOperatorCable(this.filterTypeCable);
      const operatorDate = this.getOperatorDate(this.filterTypeDate);
      if (!operator) {
        console.error("rỗng không có bộ lọc nào được lấy");
        return;
      }

      const conditions = [];

      if (this.searchValues && this.searchValues.trim() !== "") {
        const searchFields = [
          "ten_link_mang",
          "cid",
          "ten_odf_diem_dau",
          "port_odf_diem_dau",
          "tuyen_cap",
          "dia_chi_diem_dau",
          "dia_chi_diem_cuoi",
          "cidma_hop_dong_doi_tac",
          "dau_moi_lien_he_doi_tac",
          "thong_tin_ghi_chu",
          "loai_danh_sach",
        ];

        searchFields.forEach((field) => {
          conditions.push({
            field,
            logical_oper: "OR",
            oper: "like",
            value: this.searchValues.trim(),
          });
        });
      }
      if (this.searchValue) {

        conditions.push({

          field: "ten_link_mang",

          logical_oper: "AND",

          oper: operator,

          value: this.searchValue

        });

      }


      // Kiểm tra xem loại cáp có được chọn không

      if (this.searchValueCable) {

        conditions.push({

          field: "cap", // Thay đổi trường này nếu cần

          logical_oper: "AND",

          oper: operatorCables, // Có thể thay đổi tùy theo yêu cầu

          value: this.searchValueCable.label

        });
        console.log("cáp tìm kếm", this.formData.cap)
      }
      if (this.searchDate) {
        if (this.filterTypeDate === 'during' && this.searchDate && this.searchDate2) {
          const formattedStartDate = this.formatDates(this.searchDate);

          const formattedEndDate = this.formatDates(this.searchDate2);
          conditions.push({

            field: "ngay_up_link",

            logical_oper: "AND",

            oper: "between",

            value: formattedStartDate,

            second_value: formattedEndDate

          });

        } else {
          const formattedDate = this.formatDates(this.searchDate);
          conditions.push({

            field: "ngay_up_link",

            logical_oper: "AND",

            oper: operatorDate,

            value: formattedDate

          });

        }
      }

      // Kiểm tra nếu không có điều kiện nào

      if (conditions.length === 0) {

        console.error("Không có điều kiện tìm kiếm nào.");

        return; // Ngừng thực hiện nếu không có điều kiện

      }


      console.log("Conditions:", conditions);

      await this.fetchNetWorksList(conditions);
      this.isSearchTriggered = true;

    },
    async infoNetwork(networkId) {
      try {
        this.fixed = false;
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `https://apidev.hitc.vn/moappapiv2/api/data/dhm_danhsachlinkmang_detail/by-id?id=${networkId}`,
          // gửi dữ liệu trong body của yêu cầu để máy chủ xử lý
          {
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
              "thong_tin_ghi_chu",
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.currentNetwork = response.data.data;
        console.log("Thông tin mạng:", this.currentNetwork);
        this.fixed = true;
      } catch (error) {
        console.error("Lỗi khi hiển thị thông tin mạng:", error);
      }
    }
    , async infoEdit(networkId) {
      try {
        this.dialogVisible = false;
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `https://apidev.hitc.vn/moappapiv2/api/data/dhm_danhsachlinkmang_detail/by-id?id=${networkId}`,
          {
            field: [
              "tt", "ten_link_mang", "cap", "mang", "cid", "trang_thai",
              "bang_thong_link_mbps", "ten_thiet_bi_diem_dau", "port_thiet_bi_diem_dau",
              "ten_thiet_bi_diem_cuoi", "port_thiet_bi_diem_cuoi", "ten_odf_diem_dau",
              "port_odf_diem_dau", "tuyen_cap", "khu_vuc", "dia_chi_diem_dau",
              "tinh_diem_dau", "dia_chi_diem_cuoi", "tinh_diem_cuoi", "cidma_hop_dong_doi_tac",
              "ngay_up_link", "phongban_up_link", "ngay_huy_link", "phongban_huy_link",
              "dau_moi_lien_he_doi_tac", "thong_tin_ghi_chu",
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const rawData = response.data.data;


        rawData.ngay_up_link = rawData.ngay_up_link ? this.formatDate(rawData.ngay_up_link) : '';
        rawData.ngay_huy_link = rawData.ngay_huy_link ? this.formatDate(rawData.ngay_huy_link) : '';


        this.currentNetwork = rawData;
        console.log("Thông tin mạng:", this.currentNetwork);
        this.dialogVisible = true;
      } catch (error) {
        console.error("Lỗi khi hiển thị thông tin mạng:", error);
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
    handleClickOutside(event) {

      const menu = this.$el.querySelector('.context-menu');

      if (menu && !menu.contains(event.target)) {

        this.closeContextMenu();

      }

    },

    // ----------Phân trang-----------
// chuyển đến trang đầu tiên
    goToFirstPage() {
      this.pagination.page = 1;
      this.fetchNetWorksList();
    },
    goToPreviousPage() {
      // chỉ chạy khi trang hiện tại lớn hơn 1
      if (this.pagination.page > 1) {
        // giảm số trang đi 1
        this.pagination.page--;
        this.fetchNetWorksList();
      }
    },
    goToNextPage() {
      // chỉ chạy nếu trang hiện tại nhỏ hơn trang cuối cùng
      if (this.pagination.page < this.totalPages) {
        // tăng số trang lên 1
        this.pagination.page++;
        this.fetchNetWorksList();
        console.log("Tổng số trang", this.totalPages);
        console.log("Tônng số ban ghi ", this.pagination.rowsNumber);
      }
    },
    // chuyển đến trang cuối cùng
    goToLastPage() {
      // gán trang hiện tại=tổng số trang=)trang cuối cùng
      this.pagination.page = this.totalPages;
      this.fetchNetWorksList();
    },
    updateRowsPerPage() {
      this.pagination.page = 1;
      this.fetchNetWorksList();
    },
  },
  watch: {
    'pagination.rowsPerPage': 'fetchNetWorksList',
    'pagination.page': 'fetchNetWorksList'
  }
  ,
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    this.tableRef = this.$refs.tableRef;

    this.fetchNetWorksList();

  },
  beforeUnmount() {

    document.removeEventListener('click', this.handleClickOutside);

  },
};

</script>
<style src="../css/reset.css"></style>
<style>
.search-filter .q-field__control::before {
  border: none;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
.q-pa-md {
  padding: 8px;
}
.pagination-container .q-field__control::before, .q-field__control::after {
  content: none;
  position: static;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.q-btn.q-btn-item.text-primary::before{
  box-shadow: none;
}
.pagination-icon{
  font-size: 1.715em;
}
.flex-col{
  width: 50%;

}

.flex-field{
  display: flex;
  margin: 30px auto;
  gap: 20px;
}
.search-input .q-field__control {
  color: transparent;
}


.search-input .q-field__inner .q-field__control::before,
.search-input .q-field__inner .q-field__control:hover::before {
  border-bottom: none;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}

.q-mr-sm:hover {
  border-radius: 50%;
  background: #EEEEEE;
  width: 40px;
}

.flex.inline {
  display: inline-flex;
  flex-direction: column;
}

thead {
  background: #EEE !important;
}

.q-td.q-table--col-auto-width {
  text-align: center !important;
}

.custom-table .q-td {
  padding: 8px;
}

.q-table thead tr, .q-table tbody td {
  height: fit-content;
}


.q-gutter-md.row.items-start {
  display: flex;
  justify-content: end;
  align-content: center;
  gap: 10px

}

.sortable > span {
  font-weight: 700;
  color: #fff;
}

@media (max-width: 768px) {
  .q-gutter-md.row.items-start {
    justify-content: center;
  }

  .form-grid {

    grid-template-columns: repeat(1, 1fr) !important;

  }

}

@media (min-width: 768px) and (max-width: 991.98px) {
  .form-grid {

    grid-template-columns: repeat(2, 1fr) !important;

  }
}

.info-field {
  line-height: 2.5rem;
}



.row.justify-between.q-mb-sm {
  display: flex;
  justify-content: start;
}

@media (min-width: 1024px) {
  .row > .col-md-6 {
    height: auto;
    width: 48%;
  }
}

.input-attribute {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1 {
  font-size: 20px;
  font-weight: 700;
}

.important-fields {
  color: red;
}


.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 50px auto;
}


.q-table thead {

  position: sticky;
  top: 0;
  z-index: 1;
}


html {
  font-size: 62.5%;
  /*font-size: 16px×62.5%=10px/ 62.5%; !* 1rem = 10px *!*/
}

body {
  font-size: 1.6rem;
  font-family: "Poppins", sans-serif;
}

.q-btn {
  min-width: 2em;
  padding: 3px;
}

.q-table th.sortable {
  cursor: pointer;
  padding: 15px 10px;
  text-align: left;
}

.q-pagination {
  gap: 5px;
}

.q-table__bottom.row.items-center.justify-end {
  display: none;
}

.icon-action {
  width: 40px;
  border-radius: 50%;
}

.q-table th {
  font-weight: 500;
  font-size: 13px;
  -webkit-user-select: none;
  user-select: none;
}

.custom-table .q-td {
  padding: 8px;
}

.q-mb-md {
  height: 50vh;
  overflow: auto;

}


.q-mb-md {
  height: 78vh;
  overflow: auto;
}

.pagination-container {
  display: flex;
  align-items: center;
  width: auto;
  justify-content: start;
  cursor: pointer;
  flex-wrap: wrap;
}

.text-h6 {
  font-size: 2.25rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em;
}
.q-gutter-md > * {
  margin-left: 0px;
}
@media (max-width: 768px) {
  .pagination-container {
    justify-content: center;
  }
  .flex-field{
    flex-wrap: wrap;
  }
  .flex-col{
    width: 100%;
  }

}

@media (max-width: 550px) {
  .search-input{
    width: 30%;
  }
  .header-contaniner {
    flex-direction: column;
  }
  header-col-2,
  .header-col-1 {
    align-self: start;
  }
}


</style>

