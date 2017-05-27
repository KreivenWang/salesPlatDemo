<template>
  <div class="slide-show" @mouseover="clearChangeInv" @mouseout="runChangeInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition :name="'slide-trans' + reverseTrans">
          <img :src="slides[nowIndex].src" v-if="isShowNow">
        </transition>
        <transition :name="'slide-trans-old' + reverseTrans">
          <img :src="slides[nowIndex].src" v-if="!isShowNow">
        </transition>
      </a>
    </div>
    <h2>{{slides[nowIndex].title}}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item, index) in slides">
        <a @click="goto(index)" :class="{on: index === nowIndex}">{{index + 1}}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      x: 'world',
      nowIndex: 0,
      InvId: 0,
      isShowNow: false,
      reverseTrans: ''
    };
  },
  computed: {
    prevIndex() {
      return this.nowIndex === 0
        ? this.slides.length - 1
        : this.nowIndex - 1;
    },
    nextIndex() {
      return this.nowIndex === this.slides.length - 1
        ? 0
        : this.nowIndex + 1;
    }
  },
  watch: {
    nowIndex(val, oldVal) {
      this.$emit('onchange', this.nowIndex);
    }
  },
  methods: {
    goto(index) {
      // console.log(index + ' ' + this.nowIndex + ' ' + this.nextIndex + ' ' + this.prevIndex);
      // 当新的index是当前index的前一项时, 表示向前移动
      this.reverseTrans = index === this.prevIndex
        ? ''
        : '-reverse';

      // 设置timeout只是为了给isShowNow设置false留出时间以触发动画
      this.isShowNow = false;
      setTimeout(() => {
        this.isShowNow = true;
        this.nowIndex = index;
      }, 10);
    },
    runChangeInv() {
      this.InvId = setInterval(() => {
        this.goto(this.nextIndex);
      }, this.inv);
    },
    clearChangeInv() {
      clearInterval(this.InvId);
    }
  },
  mounted() {
    this.runChangeInv();
    console.log('slides: ');
    console.log(this.slides);
  }
};
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}

.slide-trans-enter {
  transform: translateX(900px);
}

.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}

.slide-trans-reverse-enter-active {
  transition: all .5s;
}

.slide-trans-reverse-enter {
  transform: translateX(-900px);
}

.slide-trans-old-reverse-leave-active {
  transition: all .5s;
  transform: translateX(900px);
}

.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}

.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}

.slide-img {
  width: 100%;
}

.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}

.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}

.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}

.slide-pages li .on {
  text-decoration: underline;
}
</style>
