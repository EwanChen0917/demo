<template>
  <div class="leter_wrap" :class="randomClass()" :style="styleObj">
    <span class="txt" :style="{ color: styleObj.color || '' }">{{ firstName }}</span>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      name: string;
      styleObj?: any;
    }>(),
    { name: 'R', styleObj: { width: '50px', height: '50px' } }
  );

  const firstName = computed(() => {
    const list = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    const name = (props.name && props.name.slice(0, 1)) || 'R';
    if (list.includes(name.toUpperCase())) {
      return name.toUpperCase();
    }
    return name;
  });

  const randomClass = () => {
    const obj = {
      1: 'letter_color_danger',
      2: 'letter_color_warning',
      3: 'letter_color_primary',
    };
    const random = Math.floor(Math.random() * 3 + 1);
    return obj[random];
  };
</script>

<style lang="scss" scoped>
  .leter_wrap {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .txt {
      font-size: 1.35rem !important;
      font-weight: 500;
    }
  }
  .letter_color_danger {
    background-color: #fff5f8;
    .txt {
      color: #f1416c;
    }
  }
  .letter_color_warning {
    background-color: #fff8dd;
    .txt {
      color: #ffc700;
    }
  }
  .letter_color_primary {
    background-color: #eef6ff;
    .txt {
      color: #3e97ff;
    }
  }
</style>
