'use strict';

angular
.module('--ckgammonApp.services')
.constant('DicePaths', {
  1: [
    { x: 0,   y: 90,  z: 270 },
    { x: 0,   y: 270, z: 90  },
    { x: 90,  y: 0,   z: 180 },
    { x: 90,  y: 90,  z: 180 },
    { x: 90,  y: 180, z: 180 },
    { x: 90,  y: 270, z: 180 },
    { x: 180, y: 90,  z: 90  },
    { x: 180, y: 270, z: 270 },
    { x: 270, y: 0,   z: 0   },
    { x: 270, y: 90,  z: 0   },
    { x: 270, y: 180, z: 0   },
    { x: 270, y: 270, z: 0   }
  ],
  2: [
    { x: 0,   y: 0,   z: 0   },
    { x: 0,   y: 0,   z: 90  },
    { x: 0,   y: 0,   z: 180 },
    { x: 0,   y: 0,   z: 270 },
    { x: 180, y: 180, z: 0   },
    { x: 180, y: 180, z: 90  },
    { x: 180, y: 180, z: 180 },
    { x: 180, y: 180, z: 270 }
  ],
  3: [
    { x: 0,   y: 90,  z: 180 },
    { x: 0,   y: 270, z: 0   },
    { x: 90,  y: 0,   z: 90  },
    { x: 90,  y: 90,  z: 90  },
    { x: 90,  y: 180, z: 90  },
    { x: 90,  y: 270, z: 90  },
    { x: 180, y: 90,  z: 0   },
    { x: 180, y: 270, z: 180 },
    { x: 270, y: 0,   z: 270 },
    { x: 270, y: 90,  z: 270 },
    { x: 270, y: 180, z: 270 },
    { x: 270, y: 270, z: 270 }
  ],
  4: [
    { x: 0,   y: 180, z: 0   },
    { x: 0,   y: 180, z: 90  },
    { x: 0,   y: 180, z: 180 },
    { x: 0,   y: 180, z: 270 },
    { x: 180, y: 0,   z: 0   },
    { x: 180, y: 0,   z: 90  },
    { x: 180, y: 0,   z: 180 },
    { x: 180, y: 0,   z: 270 }
  ],
  5: [
    { x: 0,   y: 90,  z: 0   },
    { x: 0,   y: 270, z: 180 },
    { x: 90,  y: 0,   z: 270 },
    { x: 90,  y: 90,  z: 270 },
    { x: 90,  y: 180, z: 270 },
    { x: 90,  y: 270, z: 270 },
    { x: 180, y: 90,  z: 180 },
    { x: 180, y: 270, z: 0   },
    { x: 270, y: 0,   z: 90  },
    { x: 270, y: 90,  z: 90  },
    { x: 270, y: 180, z: 90  },
    { x: 270, y: 270, z: 90  }
  ],
  6: [
    { x: 0,  y: 90,   z: 90  },
    { x: 0,  y: 270,  z: 270 },
    { x: 90,  y: 0,   z: 0   },
    { x: 90,  y: 90,  z: 0   },
    { x: 90,  y: 180, z: 0   },
    { x: 90,  y: 270, z: 0   },
    { x: 180, y: 90,  z: 270 },
    { x: 180, y: 270, z: 90  },
    { x: 270, y: 0,   z: 180 },
    { x: 270, y: 90,  z: 180 },
    { x: 270, y: 180, z: 180 },
    { x: 270, y: 270, z: 180 }
  ]
});
