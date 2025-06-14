type Constructor<T = any> = new (... args: any ) => T;

export class Registry {
    private readonly providers = new Map<string, Registry.Provider>();

    register(implementation: Constructor){
        const token = implementation.name;

        if(this.providers.has(token)){
            throw new Error(`Provider ${token} already registered`);
        }

        const dependencies = Reflect.getMetadata('design:paramtypes', implementation) || [];

        this.providers.set(token, {
            implementation,
            dependencies,
        });

    }

    resolve<TImplementation extends Constructor>(implementation: TImplementation) : InstanceType<TImplementation>{
        const token = implementation.name;
        const provider = this.providers.get(token);

        if(!provider){
            throw new Error(`Provider ${token} not registered`);
        }

        const dependenciesInstances = provider.dependencies.map((dependency) => this.resolve(dependency));
        const instance = new provider.implementation(...dependenciesInstances);

        return instance;
    }
}

export namespace Registry {
    export type Provider = {
        implementation: Constructor;
        dependencies: Constructor[];
    }
}
