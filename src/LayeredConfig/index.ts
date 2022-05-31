import { merge } from 'lodash';

/**
 * This construct current only wraps the lodash.merge() functionality
 * but is intended to be a placeholder for future logic like: global defaults,
 * type enforcement and error handling, dynamic values (custom compute logic),
 * etc.
 */
export class LayeredConfig {
  constructor(base: any, ...layers: any[]) {
    return merge({}, base, ...layers);
  }
}
