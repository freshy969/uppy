const Row = require('./Item')
const { h } = require('preact')

module.exports = (props) => {
  // const headers = props.columns.map((column) => {
  //   return html`
  //     <th class="uppy-ProviderBrowserTable-headerColumn uppy-ProviderBrowserTable-column" onclick=${props.sortByTitle}>
  //       ${column.name}
  //     </th>
  //   `
  // })

  // <thead class="uppy-ProviderBrowserTable-header">
  //   <tr>${headers}</tr>
  // </thead>

  return (
    <div class="uppy-ProviderBrowser-body">
      <ul class="uppy-ProviderBrowser-list"
        onscroll={props.handleScroll}
        role="listbox"
        aria-label={`List of files from ${props.title}`}>
        {props.folders.map(folder => {
          let isDisabled = false
          let isChecked = props.isChecked(folder)
          if (isChecked) {
            isDisabled = isChecked.loading
          }
          return Row({
            title: props.getItemName(folder),
            id: props.getItemId(folder),
            type: 'folder',
            // active: props.activeRow(folder),
            getItemIcon: () => props.getItemIcon(folder),
            isDisabled: isDisabled,
            isChecked: isChecked,
            handleFolderClick: () => props.handleFolderClick(folder),
            handleClick: (e) => props.toggleCheckbox(e, folder),
            columns: props.columns,
            showTitles: props.showTitles
          })
        })}
        {props.files.map(file => {
          return Row({
            title: props.getItemName(file),
            id: props.getItemId(file),
            type: 'file',
            // active: props.activeRow(file),
            getItemIcon: () => props.getItemIcon(file),
            isDisabled: false,
            isChecked: props.isChecked(file),
            handleClick: (e) => props.toggleCheckbox(e, file),
            columns: props.columns,
            showTitles: props.showTitles
          })
        })}
      </ul>
    </div>
  )
}
