<template>
  <div>
    <navbar></navbar>
    <div id="about">
      <page-header :title="'Acerca'"></page-header>
    </div>
    <footer-block></footer-block>
  </div>
</template>

<script>
import Navbar from '@/components/navbar';
import PageHeader from '@/components/page-header';
import FooterBlock from '@/components/footer-block';

export default {
  name: 'about',
  components: {
    Navbar,
    PageHeader,
    FooterBlock
  }
}
</script>

<style scoped lang="scss">
</style>
