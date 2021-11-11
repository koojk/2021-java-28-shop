// jsTree
var core = {};
var plugins = ['wholerow', 'changed', 'checkbox'];

core.themes = {
  variant: 'large',
  striped: true,
};

core.check_callback = true;

core.data = {
  url: function (node) {
    return '/api/tree';
  },
  data: function (node) {
    return { id: node.id };
  },
};

$('#jstreeWrap')
  .jstree({ core: core, plugins: plugins })
  .on('changed.jstree', onChangeTree);

function onChangeTree(e, data) {
  console.log(data.selected);
}

$('.prd-wrapper .bt-modal-close').click(onCloseModal);
function onCloseModal() {
  $('.prd-wrapper .modal-wrapper').hide();
}

$('.prd-wrapper .bt-cate').click(onClickCate);
function onClickCate() {
  $('.prd-wrapper .modal-wrapper').show();
}

/******************** quill ********************/
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions,
  },
  theme: 'snow',
});

$('form[name="prdCreateForm"]').submit(onSubmitPrdCreateForm);
function onSubmitPrdCreateForm(e) {
  e.preventDefault();
  var title = this.title.value.trim();
  if (title === '') {
    this.title.focus();
    return false;
  }
  this.content.value = quill.root.innerHTML;
  this.submit();
}
