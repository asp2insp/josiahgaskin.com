// Character sets for password generation
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Word list for passphrase generation (common, easy-to-remember words)
const WORDS = [
    'correct', 'horse', 'battery', 'staple', 'apple', 'banana', 'cherry', 'dragon',
    'eagle', 'forest', 'garden', 'happy', 'island', 'jungle', 'kitten', 'lemon',
    'mountain', 'ninja', 'ocean', 'panda', 'queen', 'rabbit', 'sunset', 'tiger',
    'unicorn', 'valley', 'wizard', 'yellow', 'zebra', 'anchor', 'bridge', 'castle',
    'dolphin', 'engine', 'falcon', 'guitar', 'hammer', 'igloo', 'jester', 'knight',
    'lantern', 'magnet', 'nectar', 'orange', 'penguin', 'quartz', 'rocket', 'storm',
    'thunder', 'umbrella', 'volcano', 'window', 'xylophone', 'yogurt', 'zephyr',
    'autumn', 'breeze', 'canyon', 'desert', 'eclipse', 'feather', 'galaxy', 'harvest',
    'iceberg', 'jasmine', 'kiwi', 'lavender', 'meadow', 'nebula', 'orchid', 'phoenix',
    'quiver', 'rainbow', 'sapphire', 'tornado', 'universe', 'velvet', 'walrus', 'xenon',
    'yonder', 'zircon', 'acorn', 'blizzard', 'cloud', 'dusk', 'emerald', 'frost',
    'glacier', 'horizon', 'ivory', 'jade', 'kettle', 'lilac', 'marble', 'nautical',
    'oasis', 'pearl', 'quest', 'river', 'shadow', 'topaz', 'urban', 'violet',
    'whisper', 'aurora', 'blossom', 'coral', 'dawn', 'ember', 'flora', 'gem',
    'harbor', 'indigo', 'jasper', 'kelp', 'lotus', 'mango', 'olive',
    'petal', 'quill', 'ruby', 'sage', 'tundra', 'umber', 'vine', 'willow',
    'azure', 'birch', 'cedar', 'delta', 'echo', 'fern', 'grove', 'heath',
    'inlet', 'juniper', 'knoll', 'lake', 'maple', 'north', 'oak', 'pine',
    'ridge', 'shore', 'trail', 'water', 'amber', 'bronze', 'crimson', 'diamond',
    'ebony', 'flame', 'gold', 'honey', 'iris', 'jewel', 'lime', 'mint',
    'nova', 'onyx', 'plum', 'rose', 'silver', 'teal', 'wheat',
    'basil', 'clover', 'daisy', 'elm', 'fig', 'grass', 'herb', 'ivy',
    'moss', 'nettle', 'poppy', 'reed', 'spruce', 'thyme', 'yarrow',
    'arctic', 'beach', 'cave', 'dune', 'field', 'hill', 'mesa', 'peak',
    'plain', 'pond', 'reef', 'rock', 'sand', 'tide', 'wave', 'wood',
    // Extended word list
    'able', 'about', 'above', 'absent', 'absorb', 'abstract', 'accept', 'access',
    'account', 'action', 'active', 'actual', 'adapt', 'adult', 'advice', 'affair',
    'afford', 'afraid', 'after', 'again', 'against', 'agent', 'agree', 'ahead',
    'alarm', 'album', 'alert', 'alien', 'align', 'alive', 'allow', 'almost',
    'alone', 'along', 'alpha', 'already', 'also', 'alter', 'always', 'amazing',
    'among', 'amount', 'amuse', 'ancient', 'anger', 'angle', 'angry', 'animal',
    'ankle', 'annual', 'another', 'answer', 'antique', 'anxiety', 'apart', 'apology',
    'appear', 'applaud', 'april', 'apron', 'area', 'arena', 'argue', 'arise',
    'army', 'around', 'arrange', 'arrest', 'arrive', 'arrow', 'artist', 'artwork',
    'ascend', 'ashamed', 'aside', 'aspect', 'assault', 'assert', 'assess', 'asset',
    'assign', 'assist', 'assume', 'asthma', 'athlete', 'atom', 'attach', 'attack',
    'attempt', 'attend', 'attitude', 'attract', 'auction', 'audio', 'august', 'aunt',
    'author', 'auto', 'avocado', 'avoid', 'awake', 'aware', 'away', 'awesome',
    'awful', 'awkward', 'axis', 'baby', 'back', 'bacon', 'badge', 'badger',
    'balance', 'balcony', 'ball', 'ballet', 'balloon', 'bamboo', 'band', 'banner',
    'banquet', 'bargain', 'barrel', 'base', 'basic', 'basket', 'battle', 'bean',
    'bear', 'beard', 'beast', 'beauty', 'because', 'become', 'beef', 'before',
    'begin', 'behave', 'behind', 'believe', 'below', 'belt', 'bench', 'benefit',
    'best', 'betray', 'better', 'between', 'beyond', 'bicycle', 'bike', 'bind',
    'biology', 'bird', 'birth', 'bitter', 'black', 'blade', 'blame', 'blanket',
    'blast', 'bleak', 'bless', 'blind', 'block', 'blood', 'bloom', 'blue',
    'blur', 'blush', 'board', 'boat', 'body', 'boil', 'bold', 'bomb',
    'bone', 'bonus', 'book', 'boost', 'boot', 'border', 'boring', 'born',
    'borrow', 'boss', 'bottom', 'bounce', 'bound', 'bowl', 'brain', 'brand',
    'brass', 'brave', 'bread', 'break', 'breathe', 'brick', 'brief', 'bright',
    'bring', 'brisk', 'broken', 'brother', 'brown', 'brush', 'bubble', 'bucket',
    'budget', 'build', 'bulb', 'bulk', 'bullet', 'bundle', 'burden', 'burger',
    'burn', 'burst', 'business', 'busy', 'butter', 'button', 'buyer', 'buzz',
    'cabbage', 'cabin', 'cable', 'cactus', 'cage', 'cake', 'call', 'calm',
    'camera', 'camp', 'can', 'canal', 'cancel', 'cancer', 'candle', 'candy',
    'cannon', 'canoe', 'canvas', 'capable', 'capital', 'captain', 'car', 'carbon',
    'card', 'care', 'career', 'cargo', 'carpet', 'carry', 'cart', 'case',
    'cash', 'cat', 'catalog', 'catch', 'category', 'cattle', 'caught', 'cause',
    'caution', 'ceiling', 'celery', 'cement', 'census', 'century', 'cereal', 'certain',
    'chair', 'chalk', 'champion', 'chance', 'change', 'chaos', 'chapter', 'charge',
    'chase', 'chat', 'cheap', 'check', 'cheese', 'chef', 'chest', 'chicken',
    'chief', 'child', 'chimney', 'choice', 'choose', 'chronic', 'chunk', 'church',
    'cigar', 'cinema', 'circle', 'citizen', 'city', 'civic', 'civil', 'claim',
    'clap', 'clarify', 'claw', 'clay', 'clean', 'clerk', 'clever', 'click',
    'client', 'cliff', 'climb', 'clinic', 'clip', 'clock', 'clog', 'close',
    'cloth', 'club', 'clump', 'cluster', 'clutch', 'coach', 'coast', 'coat',
    'code', 'coffee', 'coil', 'coin', 'collect', 'color', 'column', 'combine',
    'come', 'comfort', 'comic', 'common', 'company', 'compare', 'compete', 'compile',
    'complex', 'concept', 'concern', 'concert', 'conduct', 'confirm', 'conflict', 'connect',
    'consider', 'consist', 'constant', 'contact', 'contain', 'content', 'contest', 'context',
    'contract', 'control', 'convert', 'convince', 'cook', 'cool', 'copper', 'copy',
    'core', 'corn', 'corner', 'correct', 'cost', 'couch', 'cough', 'could',
    'council', 'count', 'country', 'couple', 'courage', 'course', 'cousin', 'cover',
    'coyote', 'crack', 'cradle', 'craft', 'cram', 'crane', 'crash', 'crater',
    'crawl', 'crazy', 'cream', 'create', 'credit', 'creek', 'crew', 'cricket',
    'crime', 'crisp', 'critic', 'crop', 'cross', 'crouch', 'crowd', 'crucial',
    'cruel', 'cruise', 'crumble', 'crunch', 'crush', 'cry', 'crystal', 'cube',
    'culture', 'cup', 'cupboard', 'curious', 'current', 'curtain', 'curve', 'cushion',
    'custom', 'cute', 'cycle', 'dad', 'damage', 'damp', 'dance', 'danger',
    'daring', 'dark', 'dash', 'database', 'daughter', 'day', 'deal', 'debate',
    'debris', 'decade', 'december', 'decide', 'decline', 'decorate', 'decrease', 'deer',
    'defend', 'define', 'degree', 'delay', 'deliver', 'demand', 'demise', 'denial',
    'dentist', 'deny', 'depart', 'depend', 'deposit', 'depth', 'deputy', 'derive',
    'describe', 'design', 'desk', 'despair', 'destroy', 'detail', 'detect', 'develop',
    'device', 'devote', 'diagram', 'dial', 'diary', 'dice', 'diesel', 'diet',
    'differ', 'digital', 'dignity', 'dilemma', 'dinner', 'dinosaur', 'direct', 'dirt',
    'disagree', 'discover', 'disease', 'dish', 'dismiss', 'disorder', 'display', 'distance',
    'divert', 'divide', 'divorce', 'dizzy', 'doctor', 'document', 'dog', 'doll',
    'domestic', 'donate', 'donkey', 'donor', 'door', 'dose', 'double', 'dove',
    'draft', 'drama', 'drastic', 'draw', 'dream', 'dress', 'drift', 'drill',
    'drink', 'drip', 'drive', 'drop', 'drum', 'dry', 'duck', 'dumb',
    'dune', 'during', 'dust', 'dutch', 'duty', 'dwarf', 'dynamic', 'eager',
    'early', 'earn', 'earth', 'ease', 'east', 'easy', 'echo', 'ecology',
    'economy', 'edge', 'edit', 'educate', 'effort', 'egg', 'eight', 'either',
    'elbow', 'elder', 'electric', 'elegant', 'element', 'elephant', 'elevator', 'elite',
    'else', 'embark', 'embody', 'embrace', 'emerge', 'emotion', 'employ', 'empower',
    'empty', 'enable', 'enact', 'end', 'endless', 'endorse', 'enemy', 'energy',
    'enforce', 'engage', 'enhance', 'enjoy', 'enlist', 'enough', 'enrich', 'enroll',
    'ensure', 'enter', 'entire', 'entry', 'envelope', 'episode', 'equal', 'equip',
    'era', 'erase', 'erode', 'erosion', 'error', 'erupt', 'escape', 'essay',
    'essence', 'estate', 'eternal', 'ethics', 'evidence', 'evil', 'evoke', 'evolve',
    'exact', 'example', 'excess', 'exchange', 'excite', 'exclude', 'excuse', 'execute',
    'exercise', 'exhaust', 'exhibit', 'exile', 'exist', 'exit', 'exotic', 'expand',
    'expect', 'expire', 'explain', 'expose', 'express', 'extend', 'extra', 'eye',
    'fabric', 'face', 'faculty', 'fade', 'faint', 'faith', 'fall', 'false',
    'fame', 'family', 'famous', 'fan', 'fancy', 'fantasy', 'farm', 'fashion',
    'fast', 'fatal', 'father', 'fatigue', 'fault', 'favorite', 'feature', 'february',
    'federal', 'fee', 'feed', 'feel', 'female', 'fence', 'festival', 'fetch',
    'fever', 'few', 'fiber', 'fiction', 'field', 'figure', 'file', 'film',
    'filter', 'final', 'find', 'fine', 'finger', 'finish', 'fire', 'firm',
    'first', 'fiscal', 'fish', 'fit', 'fitness', 'fix', 'flag', 'flash',
    'flat', 'flavor', 'flee', 'flight', 'flip', 'float', 'flock', 'floor',
    'flower', 'fluid', 'flush', 'fly', 'foam', 'focus', 'fog', 'foil',
    'fold', 'follow', 'food', 'foot', 'force', 'forest', 'forget', 'fork',
    'fortune', 'forum', 'forward', 'fossil', 'foster', 'found', 'fox', 'fragile',
    'frame', 'frequent', 'fresh', 'friend', 'fringe', 'frog', 'front', 'fruit',
    'fuel', 'fun', 'funny', 'furnace', 'fury', 'future', 'gadget', 'gain',
    'game', 'gap', 'garage', 'garbage', 'gas', 'gate', 'gather', 'gauge',
    'gaze', 'general', 'genius', 'genre', 'gentle', 'genuine', 'gesture', 'ghost',
    'giant', 'gift', 'giggle', 'ginger', 'giraffe', 'girl', 'give', 'glad',
    'glance', 'glare', 'glass', 'glide', 'glimpse', 'globe', 'gloom', 'glory',
    'glove', 'glow', 'glue', 'goat', 'goddess', 'good', 'goose', 'gorilla',
    'gospel', 'gossip', 'govern', 'gown', 'grab', 'grace', 'grain', 'grant',
    'grape', 'grasp', 'gravity', 'great', 'green', 'grid', 'grief', 'grit',
    'grocery', 'group', 'grow', 'grunt', 'guard', 'guess', 'guide', 'guilt',
    'gun', 'gym', 'habit', 'hair', 'half', 'hand', 'happy', 'hard',
    'harsh', 'harvest', 'hat', 'have', 'hawk', 'hazard', 'head', 'health',
    'heart', 'heavy', 'hedgehog', 'height', 'held', 'helmet', 'help', 'hen',
    'hero', 'hidden', 'high', 'hint', 'hip', 'hire', 'history', 'hobby',
    'hockey', 'hold', 'hole', 'holiday', 'hollow', 'home', 'honey', 'hood',
    'hope', 'horn', 'horror', 'hospital', 'host', 'hotel', 'hour', 'hover',
    'huge', 'human', 'humble', 'humor', 'hundred', 'hungry', 'hunt', 'hurdle',
    'hurry', 'hurt', 'husband', 'hybrid', 'ice', 'icon', 'idea', 'identify',
    'idle', 'ignore', 'ill', 'illegal', 'illness', 'image', 'imitate', 'immense',
    'immune', 'impact', 'impose', 'improve', 'impulse', 'inch', 'include', 'income',
    'increase', 'index', 'indicate', 'indoor', 'industry', 'infant', 'inflict', 'inform',
    'inhale', 'inherit', 'initial', 'inject', 'injury', 'ink', 'inner', 'innocent',
    'input', 'inquiry', 'insane', 'insect', 'inside', 'inspire', 'install', 'intact',
    'interest', 'into', 'invest', 'invite', 'involve', 'iron', 'item', 'jacket',
    'jaguar', 'jar', 'jazz', 'jealous', 'jeans', 'jelly', 'jersey', 'job',
    'join', 'joke', 'journey', 'joy', 'judge', 'juice', 'july', 'jump',
    'june', 'junior', 'junk', 'just', 'kangaroo', 'keen', 'keep', 'key',
    'kick', 'kid', 'kidney', 'kind', 'kingdom', 'kiss', 'kit', 'kitchen',
    'kite', 'knee', 'knife', 'knock', 'know', 'label', 'labor', 'ladder',
    'lady', 'lamp', 'land', 'language', 'laptop', 'large', 'later', 'latin',
    'laugh', 'laundry', 'lava', 'lawn', 'lawsuit', 'layer', 'lazy', 'leader',
    'leaf', 'learn', 'leave', 'lecture', 'left', 'leg', 'legal', 'legend',
    'leisure', 'length', 'lens', 'leopard', 'lesson', 'letter', 'level', 'liar',
    'liberty', 'library', 'license', 'life', 'lift', 'light', 'like', 'limb',
    'limit', 'link', 'lion', 'liquid', 'list', 'little', 'live', 'lizard',
    'load', 'loan', 'lobster', 'local', 'lock', 'logic', 'lonely', 'long',
    'loop', 'lottery', 'loud', 'lounge', 'love', 'loyal', 'lucky', 'luggage',
    'lumber', 'lunar', 'lunch', 'luxury', 'lyrics', 'machine', 'mad', 'magic',
    'mail', 'main', 'major', 'make', 'mammal', 'man', 'manage', 'mandate',
    'manner', 'manual', 'march', 'margin', 'marine', 'market', 'marriage', 'mask',
    'mass', 'master', 'match', 'material', 'math', 'matrix', 'matter', 'maximum',
    'maze', 'meadow', 'mean', 'measure', 'meat', 'mechanic', 'medal', 'media',
    'melody', 'melt', 'member', 'memory', 'mental', 'mention', 'menu', 'mercy',
    'merge', 'merit', 'merry', 'mesh', 'message', 'metal', 'method', 'middle',
    'midnight', 'milk', 'million', 'mimic', 'mind', 'minimum', 'minor', 'minute',
    'miracle', 'mirror', 'misery', 'miss', 'mistake', 'mix', 'mixed', 'mixture',
    'mobile', 'model', 'modify', 'moment', 'monitor', 'monkey', 'monster', 'month',
    'moon', 'moral', 'more', 'morning', 'mosquito', 'mother', 'motion', 'motor',
    'mouse', 'move', 'movie', 'much', 'muffin', 'mule', 'multiply', 'muscle',
    'museum', 'mushroom', 'music', 'must', 'mutual', 'myself', 'mystery', 'myth',
    'naive', 'name', 'napkin', 'narrow', 'nasty', 'nation', 'nature', 'near',
    'neck', 'need', 'negative', 'neglect', 'neither', 'nephew', 'nerve', 'nest',
    'network', 'neutral', 'never', 'news', 'next', 'nice', 'night', 'noble',
    'noise', 'nominee', 'noodle', 'normal', 'nose', 'notable', 'note', 'nothing',
    'notice', 'novel', 'number', 'nurse', 'nut', 'oak', 'obey', 'object',
    'oblige', 'obscure', 'observe', 'obtain', 'obvious', 'occur', 'ocean', 'october',
    'odor', 'off', 'offer', 'office', 'often', 'oil', 'okay', 'old',
    'olympic', 'omit', 'once', 'one', 'onion', 'online', 'only', 'open',
    'opera', 'opinion', 'oppose', 'option', 'oral', 'orbit', 'orchard', 'order',
    'ordinary', 'organ', 'orient', 'original', 'orphan', 'ostrich', 'other', 'outdoor',
    'outer', 'output', 'outside', 'oval', 'oven', 'over', 'own', 'owner',
    'oxygen', 'oyster', 'ozone', 'pact', 'paddle', 'page', 'pair', 'palace',
    'palm', 'paper', 'parade', 'parent', 'park', 'parrot', 'party', 'pass',
    'patch', 'path', 'patient', 'patrol', 'pattern', 'pause', 'pave', 'payment',
    'peace', 'peanut', 'pear', 'peasant', 'pelican', 'pen', 'penalty', 'pencil',
    'people', 'pepper', 'perfect', 'permit', 'person', 'pet', 'phone', 'photo',
    'phrase', 'physical', 'piano', 'picnic', 'picture', 'piece', 'pig', 'pigeon',
    'pill', 'pilot', 'pink', 'pioneer', 'pipe', 'pistol', 'pitch', 'pizza',
    'place', 'planet', 'plastic', 'plate', 'play', 'please', 'pledge', 'pluck',
    'plug', 'plunge', 'poem', 'poet', 'point', 'polar', 'pole', 'police',
    'policy', 'pony', 'pool', 'popular', 'portion', 'position', 'possible', 'post',
    'potato', 'pottery', 'poverty', 'powder', 'power', 'practice', 'praise', 'predict',
    'prefer', 'prepare', 'present', 'pretty', 'prevent', 'price', 'pride', 'primary',
    'print', 'priority', 'prison', 'private', 'prize', 'problem', 'process', 'produce',
    'profit', 'program', 'project', 'promote', 'proof', 'property', 'prosper', 'protect',
    'proud', 'provide', 'public', 'pudding', 'pull', 'pulp', 'pulse', 'pumpkin',
    'punch', 'pupil', 'puppy', 'purchase', 'purity', 'purpose', 'purse', 'push',
    'put', 'puzzle', 'pyramid', 'quality', 'quantum', 'quarter', 'question', 'quick',
    'quit', 'quiz', 'quote', 'rabbit', 'raccoon', 'race', 'rack', 'radar',
    'radio', 'rail', 'rain', 'raise', 'rally', 'ramp', 'ranch', 'random',
    'range', 'rapid', 'rare', 'rate', 'rather', 'raven', 'raw', 'razor',
    'ready', 'real', 'reason', 'rebel', 'rebuild', 'recall', 'receive', 'recipe',
    'record', 'recycle', 'reduce', 'reflect', 'reform', 'refuse', 'region', 'regret',
    'regular', 'reject', 'relax', 'release', 'relief', 'rely', 'remain', 'remember',
    'remind', 'remove', 'render', 'renew', 'rent', 'reopen', 'repair', 'repeat',
    'replace', 'report', 'require', 'rescue', 'resemble', 'resist', 'resource', 'response',
    'result', 'retire', 'retreat', 'return', 'reunion', 'reveal', 'review', 'reward',
    'rhythm', 'rib', 'ribbon', 'rice', 'rich', 'ride', 'rifle', 'right',
    'rigid', 'ring', 'riot', 'ripple', 'risk', 'ritual', 'rival', 'road',
    'roast', 'robot', 'robust', 'romance', 'roof', 'rookie', 'room', 'rope',
    'rotate', 'rough', 'round', 'route', 'royal', 'rubber', 'rude', 'rug',
    'rule', 'run', 'runway', 'rural', 'sad', 'saddle', 'sadness', 'safe',
    'sail', 'salad', 'salmon', 'salon', 'salt', 'salute', 'same', 'sample',
    'satisfy', 'satoshi', 'sauce', 'sausage', 'save', 'say', 'scale', 'scan',
    'scare', 'scatter', 'scene', 'scheme', 'school', 'science', 'scissors', 'scorpion',
    'scout', 'scrap', 'screen', 'script', 'scrub', 'sea', 'search', 'season',
    'seat', 'second', 'secret', 'section', 'security', 'seed', 'seek', 'segment',
    'select', 'sell', 'seminar', 'senior', 'sense', 'sentence', 'series', 'service',
    'session', 'settle', 'setup', 'seven', 'shadow', 'shaft', 'shallow', 'share',
    'shed', 'shell', 'sheriff', 'shield', 'shift', 'shine', 'ship', 'shiver',
    'shock', 'shoe', 'shoot', 'shop', 'short', 'shoulder', 'shove', 'shrimp',
    'shrug', 'shuffle', 'shy', 'sibling', 'sick', 'side', 'siege', 'sight',
    'sign', 'silent', 'silk', 'silly', 'similar', 'simple', 'since', 'sing',
    'siren', 'sister', 'situate', 'six', 'size', 'skate', 'sketch', 'ski',
    'skill', 'skin', 'skirt', 'skull', 'slab', 'slam', 'sleep', 'slender',
    'slice', 'slide', 'slight', 'slim', 'slogan', 'slot', 'slow', 'slush',
    'small', 'smart', 'smile', 'smoke', 'smooth', 'snack', 'snake', 'snap',
    'sniff', 'snow', 'soap', 'soccer', 'social', 'sock', 'soda', 'soft',
    'solar', 'soldier', 'solid', 'solution', 'solve', 'someone', 'song', 'soon',
    'sorry', 'sort', 'soul', 'sound', 'soup', 'source', 'south', 'space',
    'spare', 'spatial', 'spawn', 'speak', 'special', 'speed', 'spell', 'spend',
    'sphere', 'spice', 'spider', 'spike', 'spin', 'spirit', 'split', 'spoil',
    'sponsor', 'spoon', 'sport', 'spot', 'spray', 'spread', 'spring', 'spy',
    'square', 'squeeze', 'squirrel', 'stable', 'stadium', 'staff', 'stage', 'stairs',
    'stamp', 'stand', 'start', 'state', 'stay', 'steak', 'steel', 'stem',
    'step', 'stereo', 'stick', 'still', 'sting', 'stock', 'stomach', 'stone',
    'stool', 'story', 'stove', 'strategy', 'street', 'strike', 'strong', 'struggle',
    'student', 'stuff', 'stumble', 'style', 'subject', 'submit', 'subway', 'success',
    'such', 'sudden', 'suffer', 'sugar', 'suggest', 'suit', 'summer', 'sun',
    'sunny', 'super', 'supply', 'supreme', 'sure', 'surface', 'surge', 'surprise',
    'surround', 'survey', 'suspect', 'sustain', 'swallow', 'swamp', 'swap', 'swarm',
    'sway', 'swear', 'sweet', 'swift', 'swim', 'swing', 'switch', 'sword',
    'symbol', 'symptom', 'syrup', 'system', 'table', 'tackle', 'tag', 'tail',
    'talent', 'talk', 'tank', 'tape', 'target', 'task', 'taste', 'tattoo',
    'taxi', 'teach', 'team', 'tell', 'ten', 'tenant', 'tennis', 'tent',
    'term', 'test', 'text', 'thank', 'that', 'theme', 'then', 'theory',
    'there', 'they', 'thing', 'this', 'thought', 'three', 'thrive', 'throw',
    'thumb', 'ticket', 'tidy', 'time', 'tiny', 'tip', 'tired', 'tissue',
    'title', 'toast', 'tobacco', 'today', 'toddler', 'toe', 'together', 'toilet',
    'token', 'tomato', 'tomorrow', 'tone', 'tongue', 'tonight', 'tool', 'tooth',
    'topic', 'total', 'tourist', 'toward', 'tower', 'town', 'toy', 'track',
    'trade', 'traffic', 'tragic', 'train', 'transfer', 'trap', 'trash', 'travel',
    'tray', 'treat', 'tree', 'trend', 'trial', 'tribe', 'trick', 'trigger',
    'trim', 'trip', 'trophy', 'trouble', 'truck', 'true', 'truly', 'trumpet',
    'trust', 'truth', 'try', 'tube', 'tuition', 'tumble', 'tuna', 'tunnel',
    'turkey', 'turn', 'turtle', 'twelve', 'twenty', 'twice', 'twin', 'twist',
    'two', 'type', 'typical', 'ugly', 'unable', 'unaware', 'uncle', 'uncover',
    'under', 'undo', 'unfair', 'unfold', 'unhappy', 'uniform', 'unique', 'unit',
    'universe', 'unknown', 'unlock', 'until', 'unusual', 'unveil', 'update', 'upgrade',
    'uphold', 'upon', 'upper', 'upset', 'upward', 'usable', 'usage', 'used',
    'useful', 'useless', 'usual', 'utility', 'vacant', 'vacuum', 'vague', 'valid',
    'value', 'valve', 'van', 'vanish', 'vapor', 'various', 'vast', 'vault',
    'vehicle', 'venture', 'venue', 'verb', 'verify', 'version', 'very', 'vessel',
    'veteran', 'viable', 'vibrant', 'vicious', 'victory', 'video', 'view', 'village',
    'vintage', 'virtual', 'virus', 'visa', 'visit', 'visual', 'vital', 'vivid',
    'vocal', 'voice', 'void', 'volume', 'vote', 'voyage', 'wage', 'wagon',
    'wait', 'walk', 'wall', 'walnut', 'want', 'warfare', 'warm', 'warrior',
    'wash', 'wasp', 'waste', 'watch', 'wave', 'way', 'wealth', 'weapon',
    'wear', 'weasel', 'weather', 'web', 'wedding', 'weekend', 'weird', 'welcome',
    'west', 'wet', 'whale', 'what', 'wheat', 'wheel', 'when', 'where',
    'whip', 'wide', 'width', 'wife', 'wild', 'will', 'win', 'wind',
    'wine', 'wing', 'wink', 'winner', 'winter', 'wire', 'wisdom', 'wise',
    'wish', 'witness', 'wolf', 'woman', 'wonder', 'work', 'world', 'worry',
    'worth', 'wrap', 'wreck', 'wrestle', 'wrist', 'write', 'wrong', 'yard',
    'year', 'yell', 'young', 'youth', 'zone', 'zoo'
];

// DOM elements
const randomModeBtn = document.getElementById('randomModeBtn');
const passphraseBtn = document.getElementById('passphraseBtn');
const randomMode = document.getElementById('randomMode');
const passphraseMode = document.getElementById('passphraseMode');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const wordCountSlider = document.getElementById('wordCountSlider');
const wordCountValue = document.getElementById('wordCountValue');
const uppercaseCheck = document.getElementById('uppercaseCheck');
const lowercaseCheck = document.getElementById('lowercaseCheck');
const numbersCheck = document.getElementById('numbersCheck');
const specialCheck = document.getElementById('specialCheck');
const capitalizeCheck = document.getElementById('capitalizeCheck');
const separatorCheck = document.getElementById('separatorCheck');
const numberSuffixCheck = document.getElementById('numberSuffixCheck');
const startingLettersInput = document.getElementById('startingLettersInput');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const passwordDisplay = document.getElementById('passwordDisplay');
const strengthSection = document.getElementById('strengthSection');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

let currentMode = 'random';
let currentPassword = '';

// Mode switching
randomModeBtn.addEventListener('click', () => {
    currentMode = 'random';
    randomModeBtn.classList.add('active');
    passphraseBtn.classList.remove('active');
    randomMode.style.display = 'block';
    passphraseMode.style.display = 'none';
    resetDisplay();
});

passphraseBtn.addEventListener('click', () => {
    currentMode = 'passphrase';
    passphraseBtn.classList.add('active');
    randomModeBtn.classList.remove('active');
    passphraseMode.style.display = 'block';
    randomMode.style.display = 'none';
    resetDisplay();
});

// Slider updates
lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

wordCountSlider.addEventListener('input', (e) => {
    wordCountValue.textContent = e.target.value;
});

// Generate password
generateBtn.addEventListener('click', () => {
    if (currentMode === 'random') {
        generateRandomPassword();
    } else {
        generatePassphrase();
    }
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
    if (currentPassword) {
        navigator.clipboard.writeText(currentPassword).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    }
});

function generateRandomPassword() {
    const length = parseInt(lengthSlider.value);
    let charset = '';

    if (uppercaseCheck.checked) charset += UPPERCASE;
    if (lowercaseCheck.checked) charset += LOWERCASE;
    if (numbersCheck.checked) charset += NUMBERS;
    if (specialCheck.checked) charset += SPECIAL;

    if (charset.length === 0) {
        alert('Please select at least one character type!');
        return;
    }

    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }

    currentPassword = password;
    displayPassword(password);
    calculateStrength(password, 'random');
}

function generatePassphrase() {
    const wordCount = parseInt(wordCountSlider.value);
    const capitalize = capitalizeCheck.checked;
    const useSeparator = separatorCheck.checked;
    const addNumber = numberSuffixCheck.checked;
    const startingLetters = startingLettersInput.value.toLowerCase().trim();

    // Get random words
    const selectedWords = [];

    // If starting letters are specified, validate and use them
    if (startingLetters) {
        if (startingLetters.length > wordCount) {
            alert(`You specified ${startingLetters.length} letters but only ${wordCount} words. Please adjust.`);
            return;
        }

        // Validate that all characters are letters
        if (!/^[a-z]+$/.test(startingLetters)) {
            alert('Starting letters must only contain letters (a-z).');
            return;
        }
    }

    for (let i = 0; i < wordCount; i++) {
        let word;

        if (startingLetters && i < startingLetters.length) {
            // Filter words that start with the specified letter
            const targetLetter = startingLetters[i];
            const matchingWords = WORDS.filter(w => w.startsWith(targetLetter));

            if (matchingWords.length === 0) {
                alert(`No words found starting with '${targetLetter}'. Try a different letter.`);
                return;
            }

            // Pick a random word from matching words
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            word = matchingWords[array[0] % matchingWords.length];
        } else {
            // Pick any random word
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            word = WORDS[array[0] % WORDS.length];
        }

        if (capitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        selectedWords.push(word);
    }

    // Join with separator
    let passphrase = useSeparator ? selectedWords.join('-') : selectedWords.join('');

    // Add number suffix
    if (addNumber) {
        const numberArray = new Uint32Array(1);
        crypto.getRandomValues(numberArray);
        const randomNumber = numberArray[0] % 1000;
        passphrase += randomNumber;
    }

    currentPassword = passphrase;
    displayPassword(passphrase);
    calculateStrength(passphrase, 'passphrase');
}

function displayPassword(password) {
    passwordDisplay.textContent = password;
    passwordDisplay.classList.add('generated');
    copyBtn.disabled = false;
}

function calculateStrength(password, type) {
    strengthSection.style.display = 'block';

    let strength = 0;
    let strengthClass = '';
    let strengthLabel = '';

    // Calculate entropy-based strength
    const length = password.length;

    if (type === 'random') {
        let charsetSize = 0;
        if (uppercaseCheck.checked) charsetSize += 26;
        if (lowercaseCheck.checked) charsetSize += 26;
        if (numbersCheck.checked) charsetSize += 10;
        if (specialCheck.checked) charsetSize += SPECIAL.length;

        const entropy = length * Math.log2(charsetSize);

        if (entropy < 40) {
            strengthClass = 'weak';
            strengthLabel = 'Weak - Too short or limited character set';
        } else if (entropy < 60) {
            strengthClass = 'fair';
            strengthLabel = 'Fair - Could be stronger';
        } else if (entropy < 80) {
            strengthClass = 'good';
            strengthLabel = 'Good - Should be secure for most uses';
        } else {
            strengthClass = 'strong';
            strengthLabel = 'Strong - Excellent password!';
        }
    } else {
        // Passphrase strength based on word count and modifications
        const wordCount = parseInt(wordCountSlider.value);
        const hasNumbers = numberSuffixCheck.checked;
        const entropy = wordCount * Math.log2(WORDS.length) + (hasNumbers ? Math.log2(1000) : 0);

        if (entropy < 40) {
            strengthClass = 'weak';
            strengthLabel = 'Weak - Add more words';
        } else if (entropy < 50) {
            strengthClass = 'fair';
            strengthLabel = 'Fair - Consider adding more words or a number';
        } else if (entropy < 60) {
            strengthClass = 'good';
            strengthLabel = 'Good - Memorable and secure';
        } else {
            strengthClass = 'strong';
            strengthLabel = 'Strong - Excellent passphrase!';
        }
    }

    strengthFill.className = 'strength-fill ' + strengthClass;
    strengthText.className = 'strength-text ' + strengthClass;
    strengthText.textContent = strengthLabel;
}

function resetDisplay() {
    passwordDisplay.textContent = 'Click "Generate" to create a password';
    passwordDisplay.classList.remove('generated');
    strengthSection.style.display = 'none';
    copyBtn.disabled = true;
    currentPassword = '';
}

// Initialize
copyBtn.disabled = true;
