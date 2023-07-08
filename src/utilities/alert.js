import { enqueueSnackbar } from 'notistack'

export default function alert(type, message) {
    if (type === 'success') {
        enqueueSnackbar(message, { variant: 'success', anchorOrigin : { vertical: 'top', horizontal: 'right', }, })
    } else if (type === 'error') {
        enqueueSnackbar(message, { variant: 'error', anchorOrigin : { vertical: 'top', horizontal: 'right', }, })
    } else if (type === 'warning') {
        enqueueSnackbar(message, { variant: 'warning', anchorOrigin : { vertical: 'top', horizontal: 'right', }, })
    } else if (type === 'info') {
        enqueueSnackbar(message, { variant: 'info', anchorOrigin : { vertical: 'top', horizontal: 'right', }, })
    } else {
        enqueueSnackbar(message, { variant: 'default', anchorOrigin : { vertical: 'top', horizontal: 'right', }, })
    }
}