var momentSettingsBackup = {
    canView: '',
    viewExceptions: '',

    canComment: '',
    commentExceptions: ''

    // Использование объекта:
    // если viewExceptions != '', значит берем челов из .moment-settings-exceptions
    // иначе смотрим, что в canView {'look-all', 'look-subs', 'look-relatives'}.
    // А если и canView == '', значит никто не может смотреть.
    // Кстати, если никто не видит, то зачем настройки комментирования?
}

var momentSettings = j('#popMomentSettings')
// var momentSettingsBackup = '';

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
    // momentSettingsBackup = momentSettings.innerHTML;
    // Это плохой способ бэкапа, DOM-привязки сбиваются
    backupMomentSettings()
    momentSettings.style.bottom = 0
}

function momentSettingsHide(e, accepted) {
    if (accepted == false) {
        // momentSettings.innerHTML = momentSettingsBackup;
        // Это плохой способ бэкапа, DOM-привязки сбиваются
        restoreMomentSettings()
    }
    momentSettings.style.bottom = '-120%'
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

function backupMomentSettings() {
    if (exceptionCheckboxLook.checked) {
        momentSettingsBackup.viewExceptions = momsetExceptionsLook.innerHTML
    } else {
        l('Делаем canView')
        l(_momsetCheckedInputID(momsetGroupLook))
        momentSettingsBackup.canView = _momsetCheckedInputID(momsetGroupLook)
        l(momentSettingsBackup.canView)
    }

    if (exceptionCheckboxComment.checked) {
        momentSettingsBackup.commentExceptions = momsetExceptionsComment.innerHTML
    } else {
        momentSettingsBackup.canComment = _momsetCheckedInputID(momsetGroupComment)
    }
    l('backed:')
    l(momentSettingsBackup)
}

function restoreMomentSettings() {
    l('restoring:')
    l(momentSettingsBackup)
    listenCheckboxOnChange = false
    momentSettings.querySelectorAll('input').forEach(input => {
        input.checked = false
    })
    listenCheckboxOnChange = true

    if (momentSettingsBackup.viewExceptions != '') {
        exceptionCheckboxLook.checked = true
        momsetExceptionsLook.innerHTML = momentSettingsBackup.viewExceptions
    } else {
        if (momentSettingsBackup.canView != '') {
            momsetGroupLook.querySelector('input#' + momentSettingsBackup.canView).checked = true
        }
    }

    if (momentSettingsBackup.commentExceptions != '') {
        exceptionCheckboxComment.checked = true
        momsetExceptionsComment.innerHTML = momentSettingsBackup.commentExceptions
    } else {
        if (momentSettingsBackup.canComment != '') {
            momsetGroupComment.querySelector('input#' + momentSettingsBackup.canComment).checked = true
        }
    }

    strengthenCheckedRows()
    exceptionsVisibilityCheck()
}

function _momsetCheckedInputID(inputGroup) {
    // check, which input of group is checked, & return ID
    // if none, return ''
    var res = ''
    inputGroup.querySelectorAll('input').forEach(input => {
        if (input.checked) {
            l('checked id: ')
            l(input.id)
            res = input.id
        }
    })
    return res
}