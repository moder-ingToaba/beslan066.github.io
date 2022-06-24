var momentSettings = j('#popMomentSettings')
var momentSettingsBackup = '';

var momsetGroupLook    = jj('.moment-settings-input-group')[0]
var momsetGroupComment = jj('.moment-settings-input-group')[1]
var momsetRowsLook    = momsetGroupLook.querySelectorAll('.moment-settings-row')
var momsetRowsComment = momsetGroupLook.querySelectorAll('.moment-settings-row')
var momsetRowsALL = document.querySelectorAll('.moment-settings-row')

var exceptionCheckboxLook    = j('#look-all-except')
var exceptionCheckboxComment = j('#comment-all-except')
var momsetExceptionsLook    = momsetGroupLook.querySelector('.moment-settings-exceptions')
var momsetExceptionsComment = momsetGroupComment.querySelector('.moment-settings-exceptions')

var listenCheckboxOnChange = true

strengthenCheckedRows()
momsetAddEvents()

function showMomentSettings(event) {
    momentSettingsBackup = momentSettings.innerHTML;
    momentSettings.style.bottom = 0;
}

function momentSettingsHide(e, accepted) {
    if (accepted == false) {
        momentSettings.innerHTML = momentSettingsBackup;
    }
    momentSettings.style.bottom = '-120%';
}

function momsetAddEvents() {
    momsetRowsALL.forEach(element => {
        // element.setAttribute('onclick', 'momsetRowOnClick(event, this)')
        element.querySelector('input').setAttribute('onchange', 'momsetCheckboxOnChange(event)')
    })
}

function momsetCheckboxOnChange(event) {
    checkboxSender = event.target.parentElement.querySelector('input')
    if (listenCheckboxOnChange) {
        momsetToggleBoxes(event, checkboxSender)
    }
}

function momsetCheckboxToggle(event, checkboxSender) {
    checkboxSender.checked = !checkboxSender.checked
}

function momsetToggleBoxes(event, checkboxSender) {
    var parentGroup = checkboxSender.parentElement.parentElement
    if (!parentGroup.classList.contains('moment-settings-input-group')) {
        console.log('Не нашел div .moment-settings-input-group')
        return
    }
    var inputs = parentGroup.querySelectorAll('input')

    if (!checkboxSender.checked) {
        // inputs[0].checked = true
    } else {
        inputs.forEach(element => {
            if (element != checkboxSender) {
                element.checked = false
            }
        });
    }
    
    strengthenCheckedRows()
    exceptionsVisibilityCheck()
}

function strengthenCheckedRows() {
    // l('strengthen rows')
    momsetRowsALL.forEach(row => {
        row.classList.remove('checked-row')
        if (row.querySelector('input').checked) {
            row.classList.add('checked-row')
        }
    })
}

function exceptionsVisibilityCheck() {
    if (exceptionCheckboxLook.checked) {
        momsetExceptionsLook.style.display = 'flex'
    } else {
        momsetExceptionsLook.style.display = 'none'
    }

    if (exceptionCheckboxComment.checked) {
        momsetExceptionsComment.style.display = 'flex'
    } else {
        momsetExceptionsComment.style.display = 'none'
    }
}