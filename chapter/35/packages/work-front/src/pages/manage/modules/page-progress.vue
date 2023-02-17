<template>
  <div class="module-progress">
    <div class="progress-stacked">
      <div class="progress" :style="{ width: progressWidth }">
        <div class="progress-bar"></div>
      </div>
    </div>
    <div class="progress-stage-list">
      <div class="progress-stage-item">
        <div class="stage-title">数据已准备</div>
        <div class="stage-action">
          <div class="stage-action-btn-groups">
            <Button type="primary" @click="onClickToEdit"> 重新编辑 </Button>
          </div>
        </div>
      </div>
      <div
        class="progress-stage-item"
        v-for="(item, index) in stageList"
        :key="index"
      >
        <div class="stage-title">{{ item.name }}</div>
        <div class="stage-action">
          <div v-if="item.btnText" class="stage-action-btn-groups">
            <Button type="primary" @click="onClickToPush(item.stage)">
              {{ item.btnText }}
            </Button>
          </div>
          <div
            class="stage-action-preview"
            v-if="
              props.stage &&
              previewStageKeyList.includes(item.stage) &&
              previewStageKeyList.indexOf(item.stage) <=
                previewStageKeyList.indexOf(props.stage)
            "
          >
            <a
              class="data-value"
              href="javascript:void(0);"
              @click="onPreview('bundle', item.stage)"
            >
              预览Bundle
            </a>
            <a
              class="data-value"
              href="javascript:void(0);"
              @click="onPreview('esm', item.stage)"
            >
              预览ESM
            </a>
            <a
              class="data-value"
              href="javascript:void(0);"
              @click="onPreview('amd', item.stage)"
            >
              预览AMD
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from '@my/components';
import type { PageStage, MyAPIResult } from '../types';

const router = useRouter();

const props = defineProps<{
  uuid: string;
  version: string;
  stage: PageStage | null;
}>();
const emits = defineEmits<{
  (
    event: 'publish',
    data: { stage: PageStage; result: MyAPIResult | Error }
  ): void;
}>();
const progressWidth = ref<string>('0%');
const stageList: {
  name: string;
  btnText?: string;
  stage: PageStage;
}[] = [
  { name: '测试环境', btnText: '提交测试环境', stage: 'test' },
  { name: '预发环境', btnText: '提交预发环境', stage: 'pre' },
  { name: '线上环境', btnText: '提交线上环境', stage: 'prod' }
];
const previewStageKeyList = ['test', 'pre', 'prod'];

function refreshStage(stage: PageStage | null) {
  let progressWidthPercent = 25;
  for (let i = 0; i < stageList.length; i++) {
    const item = stageList[i];
    if (item.stage === stage) {
      progressWidthPercent = progressWidthPercent + (i + 1) * 25;
    }
  }
  progressWidth.value = `${progressWidthPercent}%`;
}

const onClickToEdit = () => {
  router.push({
    path: '/page',
    query: { uuid: props.uuid }
  });
};

const onClickToPush = (stage: PageStage) => {
  fetch('/api/post/page-stage/publish', {
    body: JSON.stringify({ uuid: props.uuid, stage }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
    .then((res) => res.json())
    .then((result: MyAPIResult) => {
      emits('publish', { stage, result });
    })
    .catch((err: Error) => {
      emits('publish', { stage, result: err });
    });
};

const onPreview = (type: 'bundle' | 'amd' | 'esm', stage: PageStage) => {
  const previewTypeMap = {
    prod: 'preview',
    ready: 'preview-test',
    test: 'preview-test',
    pre: 'preview-pre'
  };
  window.open(
    `/${previewTypeMap[stage] || previewTypeMap['test']}/${props.uuid}/${
      props.version
    }/${type}`
  );
};

onMounted(() => {
  refreshStage(props.stage);
});

watch([() => props.stage], ([newStage]) => {
  refreshStage(newStage);
});
</script>

<style lang="less">
.module-progress {
  width: 100%;
  .progress-stacked {
    display: flex;
    height: 20px;
    overflow: hidden;
    font-size: 12px;
    background-color: #353b42;
    border-radius: 10px;

    .progress {
      display: flex;
      height: 100%;
      overflow: hidden;
      font-size: 12px;
      background-color: #bdbfc1;

      .progress-bar {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        color: #ffffff;
        text-align: center;
        white-space: nowrap;
        background-image: linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.15) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.15) 50%,
          rgba(255, 255, 255, 0.15) 75%,
          transparent 75%,
          transparent
        );
        background-size: 16px 16px;
        background-color: #0f6efa;
        transition: width 0.5s ease;
      }
    }
  }
  .progress-stage-list {
    display: flex;
    flex-direction: row;
    margin-top: 10px;

    .progress-stage-item {
      width: 25%;
      text-align: center;
      font-size: 18px;
      color: #555555;
      font-weight: 400;

      .stage-action {
        .stage-action-btn-groups {
          margin-top: 10px;
        }
        .stage-action-preview {
          margin-top: 10;
          font-size: 12px;
          .data-value {
            margin: 0 4px;
          }
        }
      }
    }
  }
}
</style>
