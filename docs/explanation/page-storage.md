---
layout: docs
title: "Page storage internals"
description: "How Wicket stores and manages page instances internally"
keywords: IPageStore serialization disk session cache page version
category: explanation
---

During request handling, Wicket manages page instances through interface *org.apache.wicket.request.handler.IPageProvider*. This interface creates a new page instance or loads a previously serialized page instance if we provide the corresponding page id. *IPageProvider* delegates page creation and retrieval to interface *org.apache.wicket.core.request.mapper.IPageSource*. When page class is provided *IPageSource* delegates page creation to interface *org.apache.wicket.IPageFactory*, while when page id is provided it uses interface *org.apache.wicket.page.IPageManager* to load the previously serialized page.

The following workflow diagram summarizes the mechanism seen so far:

<figure>
<img src="/img/guide/page-storage.png" />
</figure>

# IPageManager

*org.apache.wicket.page.IPageManager*’s task is to manage which pages have been used in a request and store their last state in the backing stores, namely *IPageStore*. The default implementation *org.apache.wicket.page.PageManager* uses a chain of *IPageStore* to collect all stateful pages which have been used in the request cycle and store them for a later use.

> [!NOTE]
> Keep in mind that more than one page can be used in a single request if, for example, *setResponsePage()* or *RestartResponseException* are used.

As said on <a href="#versioningCaching.adoc#_page_caching" class="cross-reference">paragraph 8.2.4</a> stateful pages are stored in a session-relative file using a two-levels cache to speedup the access. This process is made possible by the different implementations of *IPageStore* that are part of the default chain and that will be introduced in the next paragraph.

> [!NOTE]
> Wicket gets the default *IPageManager* using a supplier interface called *IPageManagerProvider*,hence to use a custom *IPageManager* implementation we must register a specific *IPageManagerProvider* via *org.apache.wicket.Application.setPageManagerProvider(IPageManagerProvider)*.

# Default IPageStore chain

*org.apache.wicket.pageStore.IPageStore*’s role is to mediate the storing and loading of page instances. The default chain of *IPageStore* used by Wicket contains the following ordered list of *IPageStore*:

- **RequestPageStore:** collect all page instances involved in the last request. During the detach stage, stateful pages are passed to the other steps of the chain to be persisted on file.

- **InSessionPageStore:** with *InSessionPageStore* the default chain keeps the last rendered page instance into the HTTP session for fast access.

- **SerializingPageStore:** *SerializingPageStore* turns page instances into a more serialization-friendly format represented by class *org.apache.wicket.pageStore.SerializedPage*. This is a struct of:

``` java
{
   pageType: String,
   pageId : int,
   data : byte[]
}
```

i.e. this is the serialized page instance (data) plus additional information needed to be able to easily find it later (pageId, pageType).

- **AsynchronousPageStore:** The role of *AsynchronousPageStore* is to detach the http worker thread from waiting for the write of the page bytes to the disk. To disable it use: *org.apache.wicket.settings.StoreSettings.setAsynchronous(false)*. *AsynchronousPageStore* can delay the storage of page’s bytes for at most *org.apache.wicket.settings.StoreSettings.setAsynchronousQueueCapacity(int)* pages. If this capacity is exceeded then the page’s bytes are written synchronously to the backing *IPageStore*.

<!-- -->

- **CryptingPageStore:** page instances might contain sensible information, therefore it’s important to have the chance to encrypt their content before persist them on disk. *CryptingPageStore* encrypts *SerializedPage*’s with a 256 bit AES before passing them to the underling *DiskPageStore*. Buy default this stage is disabled and not added to the default chain. To change this behavior we can use *org.apache.wicket.settings.StoreSettings.setEncrypted*.

<!-- -->

- **DiskPageStore:** stores *SerializedPage* on a session-scoped file on disk. The location of the folder where the files are stored is configurable via *org.apache.wicket.settings.StoreSettings.setFileStoreFolder(File)*, by default the web container’s work folder is used (ServletContext attribute ’javax.servlet.context.tempdir’). In this folder a sub-folder is created named *’applicationName-filestore’*. This folder contains a sub-folder for each active http session. This session folder contains a single file named ’data’ which contains the bytes for the pages. The size of this ’data’ file is configurable via *org.apache.wicket.settings.StoreSettings.setMaxSizePerSession(Bytes)*. When this size is exceeded the newly stored files overwrite the oldest ones.

# InMemoryPageStore

An alternative *IPageStore* we can use in a custom chain is *org.apache.wicket.pageStore.InMemoryPageStore*. This implementation stores pages in a session-relative variable which can be limited by size or by page instance number.

# DebugBar

Further insights which can be valuable during debugging can be retrieved using the *org.apache.wicket.devutils.debugbar.DebugBar* from wicket-devutils.jar. It’s a panel which you simply add:

Java:

``` java
add(new DebugBar("debug"));
```

HTML:

``` html
<span wicket:id="debug"/>
```
