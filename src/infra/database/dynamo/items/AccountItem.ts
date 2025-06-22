import { Account } from '@application/entities/Account';

export class AccountItem {
    private readonly type = 'Account';
    private readonly keys: AccountItem.Keys;

    constructor(private readonly attributes: AccountItem.Attributes) {
        this.keys = {
            PK: AccountItem.getPK(this.attributes.id),
            SK: AccountItem.getSK(this.attributes.id),
            GSI1PK: AccountItem.getGSI1PK(this.attributes.email),
            GSI1SK: AccountItem.getGSI1SK(this.attributes.email),
        };
    }

    static fromEntity(entity: Account): AccountItem {
        return new AccountItem({
            id: entity.id,
            email: entity.email,
            externalId: entity.externalId,
            createdAt: entity.createdAt.toISOString(),
        });
    }

    toItem(): AccountItem.ItemType {
        return {
            type: this.type,
            ...this.attributes,
            ...this.keys,
        };
    }

    static getPK(id: string): AccountItem.Keys['PK'] {
        return `ACCOUNT#${id}`;
    }

    static getSK(id: string): AccountItem.Keys['SK'] {
        return `ACCOUNT#${id}`;
    }

    static getGSI1PK(email: string): AccountItem.Keys['GSI1PK'] {
        return `ACCOUNT#${email}`;
    }

    static getGSI1SK(email: string): AccountItem.Keys['GSI1SK'] {
        return `ACCOUNT#${email}`;
    }
}

export namespace AccountItem {

    export type Keys = {
        PK: `ACCOUNT#${string}`;
        SK: `ACCOUNT#${string}`;
        GSI1PK: `ACCOUNT#${string}`;
        GSI1SK: `ACCOUNT#${string}`;
    }

    export type Attributes = {
        id: string;
        email: string;
        externalId: string;
        createdAt: string;
    }

    export type ItemType = Keys & Attributes & { type: 'Account' };
}
