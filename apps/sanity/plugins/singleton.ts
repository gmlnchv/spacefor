import { type DocumentDefinition } from 'sanity'
import { type StructureBuilder } from 'sanity/structure'

export const deskStructure = (types: DocumentDefinition[]) => {
  return (S: StructureBuilder) => {
    const singletonItems = types.map((type) =>
      S.listItem()
        .title(type.title ?? type.name)
        .icon(type.icon)
        .child(S.editor().schemaType(type.name).documentId(type.name)),
    )

    const defaultItems = S.documentTypeListItems().filter(
      (listItem) =>
        !types.find((singleton) => singleton.name === listItem.getId()),
    )

    return S.list()
      .title('Content')
      .items([...singletonItems, S.divider(), ...defaultItems])
  }
}

export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem) => !types.includes(templateItem.templateId),
          )
        }

        return prev
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
}
