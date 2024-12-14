import { ASTUtils, getAttributeNames, Selectors } from '@angular-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';
import { createESLintRule } from '../utils/create-eslint-rule';

export type Options = [];
export type MessageIds = 'noInputNative';
export const RULE_NAME = 'no-input-native';

export default createESLintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Ensures that input, are not named as standard DOM attributes',
    },
    schema: [],
    messages: {
      noInputNative:
        'Input bindings, including aliases, should not be named as standard DOM events',
    },
  },
  defaultOptions: [],
  create(context) {
    const nativeAttributeNames = getAttributeNames();
    const selectors = [
      Selectors.INPUTS_METADATA_PROPERTY_LITERAL,
      Selectors.INPUT_ALIAS,
      Selectors.INPUT_PROPERTY_OR_SETTER,
      Selectors.INPUT_SIGNAL_PROPERTY,
    ].join(',');

    return {
      [selectors](
        node: TSESTree.Identifier | TSESTree.Literal | TSESTree.TemplateElement,
      ) {
        const [propertyName, aliasName] = ASTUtils.getRawText(node)
          .replace(/\s/g, '')
          .split(':');

        if (
          !nativeAttributeNames.has(propertyName) &&
          !nativeAttributeNames.has(aliasName)
        ) {
          return;
        }

        context.report({
          node,
          messageId: 'noInputNative',
        });
      },
    };
  },
});
