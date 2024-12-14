import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/test-utils';
import type {
  InvalidTestCase,
  ValidTestCase,
} from '@typescript-eslint/rule-tester';
import type { MessageIds, Options } from '../../../src/rules/no-input-native';

const messageId: MessageIds = 'noInputNative';

export const valid: readonly (string | ValidTestCase<Options>)[] = [
  `class Test {}`,
  `
    @Page({
      inputs: ['play', popstate, \`online\`, 'obsolete: obsol', 'store: storage'],
    })
    class Test {}
    `,
  `
    @Component()
    class Test {
      change = input();
    }
    `,
  `
    @Directive()
    class Test {
      @Input() toBeVerb = 'for';
    }
    `,
  // `
  //   @Directive()
  //   class Test {
  //     buttonChange = input<'title' | 'part'>();
  //   }
  //   `,
  // // https://github.com/angular-eslint/angular-eslint/issues/523
  // `
  //   @Component()
  //   class Test {
  //     @Input() Drag = new EventEmitter<{ click: string }>();
  //   }
  //   `,
  // // https://github.com/angular-eslint/angular-eslint/issues/523
  // `
  //   @Component()
  //   class Test {
  //     Drag = input<{ click: string }>();
  //   }
  //   `,
  // // https://github.com/angular-eslint/angular-eslint/issues/523
  // `
  //   @Directive()
  //   class Test {
  //     @Input(\`changelower\`) changeText = new EventEmitter<{ bar: string, blur: string }>();
  //   }
  //   `,
  // // https://github.com/angular-eslint/angular-eslint/issues/523
  // `
  //   @Directive()
  //   class Test {
  //     changeText = input<{ bar: string, blur: string }>({ alias: \`changelower\` });
  //   }
  //   `,
  // `
  //   @Component()
  //   class Test {
  //     @Input('buttonChange') changelower = new EventEmitter<ComplextObject>();
  //   }
  //   `,
  // `
  //   @Component()
  //   class Test {
  //     changelower = new input<ComplextObject>({ alias: 'buttonChange' });
  //   }
  //   `,
  // `
  //   @Directive()
  //   class Test<SVGScroll> {
  //     @Input() SVgZoom = new EventEmitter<SVGScroll>();
  //   }
  //   `,
  // `
  //   @Directive()
  //   class Test<SVGScroll> {
  //      SVgZoom = input<SVGScroll>();
  //   }
  //   `,
  // `
  //   const change = 'change';
  //   @Component()
  //   class Test {
  //     @Input(change) touchMove: EventEmitter<{ action: 'click' | 'close' }> = new EventEmitter<{ action: 'click' | 'close' }>();
  //   }
  //   `,
  // `
  //   const change = 'change';
  //   @Component()
  //   class Test {
  //     touchMove = input<{ action: 'click' | 'close' }>({ alias: change });
  //   }
  //   `,
  // `
  //   const blur = 'blur';
  //   const click = 'click';
  //   @Directive()
  //   class Test {
  //     @Input(blur) [click]: EventEmitter<Blur>;
  //   }
  //   `,
  // `
  //   const blur = 'blur';
  //   const click = 'click';
  //   @Directive()
  //   class Test {
  //     [click] = input<Blur>({ alias: blur });
  //   }
  //   `,
  // `
  //   @Component({
  //     selector: 'foo',
  //     'inputs': [\`test: ${'foo'}\`]
  //   })
  //   class Test {}
  //   `,
  // `
  //   @Directive({
  //     selector: 'foo',
  //     ['inputs']: [\`test: ${'foo'}\`]
  //   })
  //   class Test {}
  //   `,
  // `
  //   @Component({
  //     'selector': 'foo',
  //     [\`inputs\`]: [\`test: ${'foo'}\`]
  //   })
  //   class Test {}
  //   `,
  // `
  //   @Directive({
  //     selector: 'foo',
  //   })
  //   class Test {
  //     @Input() get 'getter'() {}
  //   }
  //   `,
];

export const invalid: readonly InvalidTestCase<MessageIds, Options>[] = [
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if `inputs` metadata property is named "title" in `@Directive`',
    annotatedSource: `
        @Directive({
          inputs: ['title: menuId'],
                   ~~~~~~~~~~~~~~~
        })
        class Test {}
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if `inputs` metadata property is `Literal` and named "autofocus" in `@Component`',
    annotatedSource: `
        @Component({
          'inputs': ['autofocus']
                     ~~~~~~~~~~~
        })
        class Test {}
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if `inputs` metadata property is `Literal` and aliased as "inert" in `@Directive`',
    annotatedSource: `
        @Directive({
          ['inputs']: ['bankName', {name: 'inertStatus', alias: 'inert'}],
                                                                ~~~~~~~
        })
        class Test {}
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if `inputs` metadata property is computed `TemplateLiteral` and aliased as "part" in `@Component`',
    annotatedSource: `
        @Component({
          [\`inputs\`]: [boundary, {name: 'inertStatus', alias: \`inert\`}],
                                                              ~~~~~~~
        })
        class Test {}
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input directive property is named "class" in `@Component`',
    annotatedSource: `
        @Component()
        class Test {
          @Input() class: string = 'autofocus';
                   ~~~~~
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input directive property is named "\'tabindex\'" in `@Directive`',
    annotatedSource: `
        @Directive()
        class Test {
          @Input()  'tabindex' = 10;
                    ~~~~~~~~~~
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input directive property is aliased as "`style`" in `@Component`',
    annotatedSource: `
        @Component()
        class Test {
          @Input(\`style\`) _style = getStyle();
                 ~~~~~~~
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input directive property is aliased as "popover" in `@Directive`',
    annotatedSource: `
        @Directive()
        class Test {
          @Input('popover') _popover = true;
                 ~~~~~~~~~
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input function property is named "\'hidden\'" in `@Directive`',
    annotatedSource: `
        @Directive()
        class Test {
          'hidden' = input();
          ~~~~~~~~
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input function property is aliased as "draggable" in `@Directive`',
    annotatedSource: `
        @Directive()
        class Test {
          _draggable = input(false, { alias: 'draggable' });
                                             ~~~~~~~~~~~
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input function property is aliased as "`accesskey`" in `@Component`',
    annotatedSource: `
        @Component()
        class Test {
          _accesskey = input('k', { alias: \`accesskey\` });
                                           ~~~~~~~~~~~
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input function is named "style" in `@Component`',
    annotatedSource: `
        @Component()
        class Test {
          style = input<'primary' | 'secondary' | 'error'>('primary');
          ~~~~~
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if required input function is named "lang" in `@Component`',
    annotatedSource: `
        @Component()
        class Test {
          lang = input.required(10);
          ~~~~
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input directive setter is aliased "\'id\'" in `@Component`',
    annotatedSource: `
        @Component()
        class Test {
          public _id = 0;
          @Input('id') set myId(value: number) {
                 ~~~~
            this._id = value;
          }
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input directive getter is named "\'id\'" in `@Component` despite the alias',
    annotatedSource: `
        @Component()
        class Test {
          public _id = 0;
          @Input('myId') set id(value: number) {
                             ~~
            this._id = value;
          }
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input directive setter is aliased as "hidden" in `@Directive`',
    annotatedSource: `
        @Directive()
        class Test {
          @Input(\`${'hidden'}\`) set setHidden() {}
                 ~~~~~~~~
        }
      `,
    messageId,
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input directive property is named `"part" and aliased as "slot" without `@Component`` or `@Directive`',
    annotatedSource: `
        @Injectable()
        class Test {
          @Input('slot') part = this.getinput();
                 ~~~~~~  ^^^^
        }
      `,
    messages: [
      { char: '~', messageId },
      { char: '^', messageId },
    ],
  }),
  convertAnnotatedSourceToFailureCase({
    description:
      'should fail if input function property is named "id" and aliased as "dir" without `@Component` or `@Directive`',
    annotatedSource: `
        @Injectable()
        class Test {
          id = input({ alias: 'dir' });
          ~~                  ^^^^^
        }
      `,
    messages: [
      { char: '~', messageId },
      { char: '^', messageId },
    ],
  }),
];
