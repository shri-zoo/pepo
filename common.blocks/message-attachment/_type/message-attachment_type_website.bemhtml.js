block('message-attachment')
    .mod('type', 'website')(
        content()(function () {
            var content = applyNext() || [];
            var block = this.block;
            var website = this.ctx.website;

            var container = {
                block: 'link',
                mix: { block: block, elem: 'website-container' },
                attrs: { target: '_blank', rel: 'nofollow' },
                url: website.url,
                content: []
            };

            if (website.isLoading) {
                container.content.push(
                    {
                        block: 'spin',
                        mods: {
                            theme: 'islands',
                            size: 'xl',
                            visible: true
                        },
                        mix: { block: block, elem: 'spinner' }
                    },
                    {
                        block: block,
                        elem: 'website-url',
                        content: website.rootUrl
                    }
                );
            } else {
                var websiteImage = website.image || (website.images && website.images[0]);

                container.content.push(
                    websiteImage && {
                        block: this.block,
                        elem: 'website-image-column',
                        content: {
                            block: 'image',
                            mix: { block: block, elem: 'website-image' },
                            url: websiteImage
                        }
                    },
                    {
                        block: block,
                        elem: 'website-text-column',
                        content: [
                            {
                                block: block,
                                elem: 'website-title',
                                content: website.title
                            },
                            {
                                block: block,
                                elem: 'website-description',
                                content: website.description
                            },
                            {
                                block: block,
                                elem: 'website-url',
                                content: website.rootUrl
                            }
                        ]
                    }
                );
            }

            content.push(container);

            return content;
        })
    );
