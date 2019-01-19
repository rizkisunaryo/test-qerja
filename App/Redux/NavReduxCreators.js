import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  goBack: null,
  goStack2: ['params'],
  goStack3: ['params'],
  goTabNav: ['params']
})

export const NavTypes = Types
export default Creators
