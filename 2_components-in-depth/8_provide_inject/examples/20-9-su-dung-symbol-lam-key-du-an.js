import { inject } from 'vue'
import { myInjectionKey } from './keys'

const data = inject(myInjectionKey)
