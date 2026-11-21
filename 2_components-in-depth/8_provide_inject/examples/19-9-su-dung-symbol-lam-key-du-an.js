import { provide } from 'vue'
import { myInjectionKey } from './keys'

provide(myInjectionKey, { count: 0 })
