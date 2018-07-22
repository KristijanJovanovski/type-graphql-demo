## TYPE-GRAPHQL @FieldResolver error

(node:1336) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'fields' of undefined
    at definitions.forEach.def (C:\Users\User\examples\type-graphql-demo\node_modules\type-graphql\metadata\metadata-storage.js:132:52)
    at Array.forEach (<anonymous>)
    at MetadataStorage.buildFieldResolverMetadata (C:\Users\User\examples\type-graphql-demo\node_modules\type-graphql\metadata\metadata-storage.js:122:21)
    at MetadataStorage.build (C:\Users\User\examples\type-graphql-demo\node_modules\type-graphql\metadata\metadata-storage.js:77:14)
    at Function.generateFromMetadataSync (C:\Users\User\examples\type-graphql-demo\node_modules\type-graphql\schema\schema-generator.js:33:51)    at Function.<anonymous> (C:\Users\User\examples\type-graphql-demo\node_modules\type-graphql\schema\schema-generator.js:22:33)
    at Generator.next (<anonymous>)
    at C:\Users\User\examples\type-graphql-demo\node_modules\type-graphql\schema\schema-generator.js:7:71
    at new Promise (<anonymous>)
    at __awaiter (C:\Users\User\examples\type-graphql-demo\node_modules\type-graphql\schema\schema-generator.js:3:12)
(node:1336) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or
by rejecting a promise which was not handled with .catch(). (rejection id: 2)(node:1336) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

here is the function that throws the error (compiled in js)

```js buildFieldResolverMetadata(definitions) {
        this.buildResolversMetadata(definitions);
        definitions.forEach(def => {
            def.roles = this.findFieldRoles(def.target, def.methodName);
            def.getObjectType =
                def.kind === "external"
                    ? this.resolverClasses.find(resolver => resolver.target === def.target).getObjectType
                    : () => def.target;
            if (def.kind === "external") {
                const objectTypeCls = this.resolverClasses.find(resolver => resolver.target === def.target)
                    .getObjectType();
                const objectType = this.objectTypes.find(objTypeDef => objTypeDef.target === objectTypeCls);
                const objectTypeField = objectType.fields.find(fieldDef => fieldDef.name === def.methodName);
                if (!objectTypeField) {
                    if (!def.getType || !def.typeOptions) {
                        throw new errors_1.NoExplicitTypeError(def.target.name, def.methodName);
                    }
                    const fieldMetadata = {
                        name: def.methodName,
                        schemaName: def.schemaName,
                        getType: def.getType,
                        target: objectTypeCls,
                        typeOptions: def.typeOptions,
                        deprecationReason: def.deprecationReason,
                        description: def.description,
                        roles: def.roles,
                        middlewares: def.middlewares,
                        params: def.params,
                    };
                    this.collectClassFieldMetadata(fieldMetadata);
                    objectType.fields.push(fieldMetadata);
                }
                else {
                    if (objectTypeField.params.length === 0) {
                        objectTypeField.params = def.params;
                    }
                    if (def.roles) {
                        objectTypeField.roles = def.roles;
                    }
                    else if (objectTypeField.roles) {
                        def.roles = objectTypeField.roles;
                    }
                }
            }
        });
    }
```
Somehow the following line is producing an undefined object:
```js 
const objectType = this.objectTypes.find(objTypeDef => objTypeDef.target === objectTypeCls);
```

