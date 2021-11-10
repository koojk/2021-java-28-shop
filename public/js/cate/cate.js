var core = {};
var plugins = ['contextmenu', 'dnd', 'search', 'state', 'wholerow', 'changed', 'types'];

var types = {
  default: {
    max_depth: 2,
  },
};

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

function onChangedTree(e, data) {
  console.log(data.node.id);
}

function onCreateTree(e, data) {
  console.log(data.node);
}

function onDeleteTree(e, data) {
  console.log(data.node.id);
}

function onUpdateTree() {
  var json = $('#jstreeWrap').jstree(true).get_json('#');
  axios
    .post('/api/tree', { json })
    .then(function (r) {
      console.log('hi');
      $('#jstreeWrap').jstree().refresh();
    })
    .catch(function (err) {
      console.log(err);
    });
}

$('#jstreeWrap')
  .jstree({ core: core, plugins: plugins, types })
  .on('rename_node.jstree', onUpdateTree)
  .on('move_node.jstree', onUpdateTree)
  .on('delete_node.jstree', onUpdateTree);
