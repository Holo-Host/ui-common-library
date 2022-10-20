import { onMounted } from 'vue'
import TheBanner from '../components/TheBanner.vue'
import { useBanner } from '@/composables/useBanner'

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
    const { showBanner } = useBanner()

    onMounted(() => {
      showBanner(args)
    })

    return { args }
  },

  template: '<div><TheBanner ref="bannerRef" /></div>'
})

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
