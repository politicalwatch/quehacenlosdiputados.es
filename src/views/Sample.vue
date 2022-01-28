<template>
  <div>
    <div id="samples" class="o-container o-section u-margin-bottom-10">
      <page-header title="This is a page header"/>
      <h1>This is a H1: 40px</h1>
      <h2>This is a H2: 32px</h2>
      <h3>This is a H3: 24px</h3>
      <h4>This is a H4: 16px</h4>
      <h5>This is a H5: 14px</h5>
      <h6>This is a H6: 32px</h6>
      <ul>
        <li>This is a unordered list element.</li>
        <li>This is a unordered list element.</li>
        <li>This is a unordered list element.</li>
      </ul>
      <p>This is a paragraph and <a href="/sample">this is a link</a>.</p>
    </div>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader';

export default {
  name: 'sample',
  components: {
    PageHeader,
  },
}
</script>

<style scoped lang="scss">
</style>
