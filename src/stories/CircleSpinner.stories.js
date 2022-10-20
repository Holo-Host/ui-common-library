import CircleSpinner from 'components/CircleSpinner.vue'
import { ESpinnerSize, EOverlayTheme } from '../types/ui'

export default {
  title: 'CircleSpinner',
  component: CircleSpinner,

  parameters: {
    backgrounds: {
      default: 'light'
    }
  },

  argTypes: {
    scale: {
      options: [ESpinnerSize.none, ESpinnerSize.small, ESpinnerSize.medium, ESpinnerSize.large, ESpinnerSize.xl],
      control: {
        type: 'select',
        control: {
          type: 'select',
          labels: {
            [ESpinnerSize.none]: 'none',
            [ESpinnerSize.small]: 'small',
            [ESpinnerSize.medium]: 'medium',
            [ESpinnerSize.large]: 'large',
            [ESpinnerSize.xl]: 'xl'
          }
        }
      }
    },
    theme: {
      options: [EOverlayTheme.light, EOverlayTheme.dark],
      control: {
        type: 'select',
        labels: {
          [EOverlayTheme.light]: 'light',
          [EOverlayTheme.dark]: 'dark'
        }
      }
    }
  }
}

const kTemplate = (args) => ({
  components: { CircleSpinner },

  setup() {
    return { args }
  },

  template: '<div :class="args.classes"><CircleSpinner v-bind="args" /></div>'
})

export const Default = kTemplate.bind({})
Default.args = {
  scale: 1,
  color: 'primary',
  classes: 'add-space-at-the-top'
}
