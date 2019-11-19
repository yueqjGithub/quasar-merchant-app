
// quasar notify toast
import { Notify } from 'quasar'

export function notify(message,timeout=2000,position='center',icon,color=''){
    Notify.create({message,timeout,position,icon,color})
}