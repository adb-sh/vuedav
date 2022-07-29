<template>
  <div class="px-0">
    <div class="files card">
      <div class="card-header sticky-top bg-light bg-darkmode-dark">
        <div class="row">
          <i
            v-if="path && path !== '/'"
            @click="navigateUp"
            class="col-1 px-0 btn btn-default bi-arrow-90deg-left"
          ></i>
          <PathSegments
            class="col my-2"
            :path="path"
            @newPath="(newPath) => emit('newPath', newPath)"
          />
          <div class="col-auto px-0">
            <FileUpload :path="path" @finished="fetchLocation" />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div v-if="loading">loading...</div>
        <div v-else>
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th class="d-none d-md-table-cell">Modified</th>
                <th class="d-none d-sm-table-cell">Size</th>
              </tr>
            </thead>
            <tbody>
              <component
                v-for="file in files"
                :key="file"
                :is="file.type === 'file' ? FileListElement : FolderListElement"
                :file="file"
                :client="client"
              />
            </tbody>
          </table>
        </div>
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileListElement from './FileListElement.vue';
import FolderListElement from './FolderListElement.vue';
import FileUpload from '@/components/helpers/FileUpload.vue';
import PathSegments from '@/components/files/PathSegments.vue';
import { useWebdavStore } from '@/store/webdav';
import { ref, defineProps, watch, defineEmits } from 'vue';
import type { File } from '@/models';

const props = defineProps({
  path: String,
});
const emit = defineEmits(['newPath']);

const files = ref([] as Array<File>);
const loading = ref(true as boolean);
const error = ref('' as string);
const store = useWebdavStore();

const client = store.currentSession?.client;

const fetchLocation = async () => {
  try {
    loading.value = true;
    files.value = (await client?.getDirectoryContents(
      props.path ?? '/'
    )) as Array<File>;
    loading.value = false;
    error.value = '';
  } catch (e) {
    files.value = [];
    loading.value = false;
    error.value = e as string;
  }
};

const navigateUp = () => {
  const newPath = (props.path ?? '/').split('/');
  newPath.pop();
  emit('newPath', newPath.join('/') || '/');
};

watch(
  () => props.path,
  () => {
    fetchLocation();
  }
);

fetchLocation();
</script>
