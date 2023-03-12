"""Primary configuration"""
AUTHOR = 'dr_a'
SITENAME = 'All Knowing Trash Heap'
SITEURL = ''
STATIC_PATHS = ['images', 'extra/CNAME', 'webring']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},
                       }
# THEME = 'elegant'
PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('The web ring CSS file', '/webring/swirl.css'),
         ('The web ring Javascript file', '/webring/webring.js'),
         ('Jinja2', 'https://palletsprojects.com/p/jinja/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
