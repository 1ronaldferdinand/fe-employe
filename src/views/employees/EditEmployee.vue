<template>
    <div class="container my-2">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4 class="m-4">Form Edit Data Karyawan</h4>
                        <hr>
                        <form @submit.prevent="submitForm">
                            <div style="margin-left: 4rem;">
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="name"><strong style="color: red;">*</strong> Nama</label>
                                    <input class="form-control" style="width: 70% !important" type="text" id="name" v-model="employee.name" required>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="code"><strong style="color: red;">*</strong> Kode Karyawan</label>
                                    <input class="form-control" style="width: 70% !important" type="text" id="code" v-model="employee.code" required>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="position"><strong style="color: red;">*</strong> Jenis Kelamin</label>
                                    <select class="form-control" style="width: 70% !important" id="position" v-model="employee.gender" required>
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="phone"><strong style="color: red;">*</strong> Nomor Telepon</label>
                                    <input class="form-control" style="width: 70% !important" type="text" id="phone" v-model="employee.phone" required>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="email"><strong style="color: red;">*</strong> Email</label>
                                    <input class="form-control" style="width: 70% !important" type="email" id="email" v-model="employee.email" required>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="birthdate"><strong style="color: red;">*</strong> Tanggal Lahir</label>
                                    <input class="form-control" style="width: 70% !important" type="date" id="birthdate" v-model="employee.birthdate" required>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="division"><strong style="color: red;">*</strong> Divisi</label>
                                    <select class="form-control" style="width: 70% !important" id="division" v-model="employee.division_id" required>
                                        <option value="">Pilih Divisi</option>
                                        <option v-for="division in divisions" :value="division.id" :key="division.id">{{ division.name }}</option>
                                    </select>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="position"><strong style="color: red;">*</strong> Posisi</label>
                                    <select class="form-control" style="width: 70% !important" id="position" v-model="employee.position_id" required>
                                        <option value="">Pilih Posisi</option>
                                        <option v-for="position in positions" :value="position.id" :key="position.id">{{ position.name }}</option>
                                    </select>
                                </div>
                                <div class="form-group d-flex align-items-center justify-content-start my-4">
                                    <label class="col-2" for="image">Gambar</label>
                                    <div class="dropzone form-control" style="width: 70%;" @dragover="handleDragOver" @drop="handleDrop">
                                        <input type="file" id="image" class="file-input" @change="handleImageChange" accept="image/*">
                                        <label for="image" :class="{'browse-button': true, 'has-file': employee.image}">
                                            {{ employee.image ? 'File Dipilih' : 'Jelajah' }}
                                        </label>
                                        <div v-if="employee.image" class="file-preview">
                                            <img v-if="image" :src="imagePreview" alt="Preview Image" class="preview-image">
                                            <img v-else :src="employee.image" alt="Preview Image" class="preview-image">
                                        </div>
                                    </div>
                                </div>
                                <span style="font-size: small;">Kolom dengan tanda <strong style="color: red; font-size: medium;">*</strong> berarti<strong> Wajib diisi.</strong></span>
                            </div>
                            <hr>
                            <div class="d-flex align-items-center justify-content-end m-4">
                                <button type="submit" class="btn btn-md btn-success">SIMPAN</button>
                                <router-link :to="{ name: 'employees.index' }" class="btn btn-md btn-warning mx-4">
                                    KEMBALI
                                </router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            id: null,
            employee: {
                name: '',
                code: '',
                gender: '',
                phone: '',
                email: '',
                birthdate: '',
                division_id: '',
                position_id: ''
            },
            divisions: [],
            positions: [],
            image: null,
            imagePreview: null
        };
    },
    mounted() {
        this.id = this.$route.params.id;
        this.fetchEmployee();
        this.fetchDivisions();
        this.fetchPositions();
    },
    methods: {
        fetchEmployee() {
            axios.get(`http://127.0.0.1:8000/api/employee/detail/${this.id}`)
                .then(response => {
                    this.employee = response.data.original.data;
                    this.employee.image = response.data.original.data.image;
                })
                .catch(error => {
                    console.error(error);
                });
            },
        fetchDivisions() {
            axios.get('http://127.0.0.1:8000/api/divisions')
                .then(response => {
                    this.divisions = response.data.original.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchPositions() {
            axios.get('http://127.0.0.1:8000/api/positions')
                .then(response => {
                    this.positions = response.data.original.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        handleImageChange(event) {
            this.image = event.target.files[0];
            this.employee.image = event.target.files[0].name;
            this.previewImage();
        },
        handleDragOver(event) {
            event.preventDefault();
        },
        handleDrop(event) {
            event.preventDefault();
            this.image = event.dataTransfer.files[0];
            this.employee.image = event.dataTransfer.files[0].name;
            this.previewImage();
        },
        previewImage() {
            if (this.image) {
                const reader = new FileReader();
                reader.readAsDataURL(this.image);
                reader.onload = () => {
                    this.imagePreview = reader.result;
                };
            }
        },
        submitForm() {
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('name', this.employee.name);
            formData.append('code', this.employee.code);
            formData.append('gender', this.employee.gender);
            formData.append('phone', this.employee.phone);
            formData.append('email', this.employee.email);
            formData.append('birthdate', this.employee.birthdate);
            formData.append('division_id', this.employee.division_id);
            formData.append('position_id', this.employee.position_id);
            console.log(this.image)
            axios.post(`http://127.0.0.1:8000/api/employee/update/${this.id}`, formData)
                .then(response => {
                    console.log(response.data);
                    this.employee = {
                        name: '',
                        code: '',
                        gender: '',
                        phone: '',
                        email: '',
                        birthdate: '',
                        division_id: '',
                        position_id: ''
                    };
                    this.image = null;
                    this.imagePreview = null;

                    this.$router.push({ name: 'employees.index' });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
};
</script>

<style>
.form-group {
  margin-bottom: 20px;
}

.dropzone {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  border: 2px dashed #ccc;
  cursor: pointer;
}

.file-input {
  display: none;
}

.browse-button {
  background-color: #5cb85c;
  color: #fff;
  padding: 2px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.has-file {
  background-color: #ccc;
}

.file-name {
  margin-left: 10px;
}

label {
  font-size: large;
  font-weight: 600;
}

.preview-image {
    margin: 1rem 2rem 1rem 0;
    width: auto;
    height: 200px;
}
</style>
