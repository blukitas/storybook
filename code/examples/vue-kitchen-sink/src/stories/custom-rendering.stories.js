import { linkTo } from '@storybook/addon-links';

import MyButton from './Button.vue';

export default {
  title: 'Custom/Method for rendering Vue',
};

export const Render = () => ({
  render: (h) => h('div', ['renders a div with some text in it..']),
});

export const RenderComponent = () => ({
  render(h) {
    return h(MyButton, { props: { color: 'pink' } }, ['renders component: MyButton']);
  },
});

RenderComponent.storyName = 'render + component';

export const Template = () => ({
  template: `
      <div>
        <h1>A template</h1>
        <p>rendered in vue in storybook</p>
      </div>`,
});

export const TemplateComponent = () => ({
  components: { MyButton },
  template: '<my-button>MyButton rendered in a template</my-button>',
});

TemplateComponent.storyName = 'template + component';

export const TemplateMethods = () => ({
  components: { MyButton },
  template: `
      <p>
        <em>Clicking the button will navigate to another story using the 'addon-links'</em><br/>
        <my-button :rounded="true" @click="action">MyButton rendered in a template + props & methods</my-button>
      </p>`,
  methods: {
    action: linkTo('Button'),
  },
});

TemplateMethods.storyName = 'template + methods';

export const JSX = () => ({
  components: { MyButton },
  render() {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <my-button>MyButton rendered with JSX</my-button>;
  },
});

export const PreRegisteredComponent = () => ({
  /* By pre-registering component in preview.js,
   * the need to register all components with each story is removed.
   * You'll only need the template */
  template: `
      <p>
        <em>This component was pre-registered in .storybook/preview.js</em><br/>
        <my-button>MyButton rendered in a template</my-button>
      </p>`,
});

PreRegisteredComponent.storyName = 'pre-registered component';
