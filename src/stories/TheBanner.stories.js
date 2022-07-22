import { onMounted, shallowRef } from 'vue'
import TheBanner from '../components/TheBanner.vue'
import Docs from './markdown/TheBanner.mdx'

export default {
  title: 'TheBanner',
  component: TheBanner
}

const kTemplate = (args) => ({
  components: { TheBanner },

  argTypes: {
    type: 'error',
    message: '',
    hasCloseButton: true
  },

  setup() {
    const bannerRef = shallowRef()

    onMounted(() => {
      bannerRef.value?.show(args)
    })

    return { args, bannerRef }
  },

  template: '<div><TheBanner ref="bannerRef" /></div>'
})

export const Readme = () => ({
  setup() {
    const bannerRef = shallowRef()

    onMounted(() => {
      bannerRef.value?.hide()
    })

    return { bannerRef }
  },

  template: '<div></div>'
})

Readme.parameters = {
  docs: {
    page: Docs
  }
}

export const Default = kTemplate.bind({})
Default.args = {
  message: 'Default is error',
  hasCloseButton: true
}
Default.parameters = {
  docs: {
    page: null
  }
}

export const Error = kTemplate.bind({})
Error.args = {
  type: 'error',
  message: 'This is an error message'
}
Error.parameters = {
  docs: {
    page: null
  }
}
export const Warning = kTemplate.bind({})
Warning.args = {
  type: 'warning',
  message: 'This is a warning message'
}
Warning.parameters = {
  docs: {
    page: null
  }
}

export const Success = kTemplate.bind({})
Success.args = {
  type: 'success',
  message: 'This is a success message'
}
Success.parameters = {
  docs: {
    page: null
  }
}

export const WithCloseButton = kTemplate.bind({})
WithCloseButton.args = {
  type: 'success',
  message: 'This is a success message',
  hasCloseButton: true
}
WithCloseButton.parameters = {
  docs: {
    page: null
  }
}
