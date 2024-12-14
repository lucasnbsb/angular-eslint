let nativeAttributeNames: ReadonlySet<string> | null = null;
let globalAttributeNames: ReadonlySet<string> | null = null;
let attributeNames: ReadonlySet<string> | null = null;

/**
 * Check MDN events page for details https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 *
 * Events sourse:
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
 * @link https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Document
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Element
 * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
 * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
 * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Node
 * @link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
 * @link https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimationElement
 * @link https://developer.mozilla.org/en-US/docs/Web/API/SVGElement
 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
 */

export function getAttributeNames(): ReadonlySet<string> {
  return (
    attributeNames ??
    (attributeNames = new Set<string>([
      ...getGlobalAttributeNames(),
      ...getNativeAttributeNames(),
    ]))
  );
}

export function getGlobalAttributeNames(): ReadonlySet<string> {
  return (
    globalAttributeNames ??
    (globalAttributeNames = new Set<string>([
      'accesskey',
      'anchor',
      'autocapitalize',
      'autocorrect',
      'autofocus',
      'class',
      'contenteditable',
      'contenteditable',
      'data',
      'dir',
      'draggable',
      'enterkeyhint',
      'exportparts',
      'hidden',
      'until-found',
      'id',
      'inert',
      'inputmode',
      'is',
      'lang',
      'nonce',
      'part',
      'popover',
      'slot',
      'spellcheck',
      'style',
      'tabindex',
      'title',
      'translate',
      'virtualkeyboardpolicy',
      'writingsuggestions',
    ]))
  );
}

export function getNativeAttributeNames(): ReadonlySet<string> {
  return (
    nativeAttributeNames ??
    (nativeAttributeNames = new Set<string>([
      'accept',
      'accept-charset',
      'accesskey',
      'action',
      'align Deprecated',
      'allow',
      'alt',
      'as',
      'async',
      'autocapitalize',
      'autocomplete',
      'autoplay',
      'background',
      'capture',
      'charset',
      'checked',
      'cite',
      'class',
      'cols',
      'colspan',
      'content',
      'contenteditable',
      'controls',
      'coords',
      'crossorigin',
      'csp Experimental',
      'data',
      'datetime',
      'decoding',
      'default',
      'defer',
      'dir',
      'dirname',
      'disabled',
      'download',
      'draggable',
      'enctype',
      'enterkeyhint',
      'for',
      'form',
      'formaction',
      'formenctype',
      'formmethod',
      'formnovalidate',
      'formtarget',
      'headers',
      'height',
      'hidden',
      'high',
      'href',
      'hreflang',
      'http-equiv',
      'id',
      'integrity',
      'inputmode',
      'ismap',
      'itemprop',
      'kind',
      'label',
      'lang',
      'loading',
      'list',
      'loop',
      'low',
      'max',
      'maxlength',
      'minlength',
      'media',
      'method',
      'min',
      'multiple',
      'muted',
      'name',
      'novalidate',
      'open',
      'optimum',
      'pattern',
      'ping',
      'placeholder',
      'playsinline',
      'poster',
      'preload',
      'readonly',
      'referrerpolicy',
      'rel',
      'required',
      'reversed',
      'role',
      'rows',
      'rowspan',
      'sandbox',
      'scope',
      'scoped',
      'selected',
      'shape',
      'size',
      'sizes',
      'slot',
      'span',
      'spellcheck',
      'src',
      'srcdoc',
      'srclang',
      'srcset',
      'start',
      'step',
      'style',
      'summary Deprecated',
      'tabindex',
      'target',
      'title',
      'translate',
      'type',
      'usemap',
      'value',
      'wrap',
    ]))
  );
}
