import HttpClient from "./http-client";

export class ERMAPIClient extends HttpClient {
    constructor() {
        super({
            baseURL: "/api/v1/erm/",
        });
    }

    get agreements() {
        return {
            get: (id) =>
                this.get({
                    endpoint: "agreements/" + id,
                    headers: {
                        "x-koha-embed":
                            "periods,user_roles,user_roles.patron,agreement_licenses,agreement_licenses.license,agreement_relationships,agreement_relationships.related_agreement,documents,agreement_packages,agreement_packages.package,vendor",
                    },
                }),
            getAll: (query) =>
                this.get({
                    endpoint: "agreements?" + (query || "_per_page=-1"),
                }),
            delete: (id) =>
                this.delete({
                    endpoint: "agreements/" + id,
                }),
            create: (agreement) =>
                this.post({
                    endpoint: "agreements",
                    body: agreement,
                }),
            update: (agreement, id) =>
                this.put({
                    endpoint: "agreements/" + id,
                    body: agreement,
                }),
            //count: () => this.count("agreements"), //TODO: Implement count method
        };
    }

    get licenses() {
        return {
            get: (id) =>
                this.get({
                    endpoint: "licenses/" + id,
                    headers: {
                        "x-koha-embed":
                            "user_roles,user_roles.patron,vendor,documents",
                    },
                }),
            getAll: (query) =>
                this.get({
                    endpoint: "licenses?" + (query || "_per_page=-1"),
                    headers: {
                        "x-koha-embed": "vendor.name",
                    },
                }),
            delete: (id) =>
                this.delete({
                    endpoint: "licenses/" + id,
                }),
            create: (license) =>
                this.post({
                    endpoint: "licenses",
                    body: license,
                }),
            update: (license, id) =>
                this.put({
                    endpoint: "licenses/" + id,
                    body: license,
                }),
        };
    }

    get localPackages() {
        return {
            get: (id) =>
                this.get({
                    endpoint: "eholdings/local/packages/" + id,
                    headers: {
                        "x-koha-embed":
                            "package_agreements,package_agreements.agreement,resources+count,vendor",
                    },
                }),
            getAll: (query) =>
                this.get({
                    endpoint:
                        "eholdings/local/packages?" + (query || "_per_page=-1"),
                    headers: {
                        "x-koha-embed": "resources+count,vendor.name",
                    },
                }),
            delete: (id) =>
                this.delete({
                    endpoint: "eholdings/local/packages/" + id,
                }),
            create: (local_package) =>
                this.post({
                    endpoint: "eholdings/local/packages",
                    body: local_package,
                }),
            update: (local_package, id) =>
                this.put({
                    endpoint: "eholdings/local/packages/" + id,
                    body: local_package,
                }),
            count: (query = {}) =>
                this.count({
                    endpoint:
                        "eholdings/local/packages?" +
                        new URLSearchParams({
                            _page: 1,
                            _per_page: 1,
                            ...(query && { q: JSON.stringify(query) }),
                        }),
                }),
        };
    }

    get localTitles() {
        return {
            get: (id) =>
                this.get({
                    endpoint: "eholdings/local/titles/" + id,
                    headers: {
                        "x-koha-embed": "resources,resources.package",
                    },
                }),
            getAll: (query) =>
                this.get({
                    endpoint: "eholdings/local/titles?" + (query || "_per_page=-1"),
                }),
            delete: (id) =>
                this.delete({
                    endpoint: "eholdings/local/titles/" + id,
                }),
            create: (local_package) =>
                this.post({
                    endpoint: "eholdings/local/titles",
                    body: local_package,
                }),
            update: (local_package, id) =>
                this.put({
                    endpoint: "eholdings/local/titles/" + id,
                    body: local_package,
                }),
            count: (query = {}) =>
                this.count({
                    endpoint:
                        "eholdings/local/titles?" +
                        new URLSearchParams({
                            _page: 1,
                            _per_page: 1,
                            ...(query && { q: JSON.stringify(query) }),
                        }),
                }),
        };
    }

    get localResources() {
        return {
            get: (id) =>
                this.get({
                    endpoint: "eholdings/local/resources/" + id,
                    headers: {
                        "x-koha-embed": "title,package,vendor",
                    },
                }),
        };
    }


    get EBSCOPackages() {
        return {
            get: (id) =>
                this.get({
                    endpoint: "eholdings/ebsco/packages/" + id,
                    headers: {
                        "x-koha-embed":
                            "package_agreements,package_agreements.agreement,resources+count,vendor",
                    },
                }),
            getAll: (query) =>
                this.get({
                    endpoint:
                        "eholdings/ebsco/packages/" +
                        id +
                        (query || "_per_page=-1"),
                    headers: {
                        "x-koha-embed": "resources+count,vendor.name",
                    },
                }),
        };
    }

    get EBSCOTitles() {
        return {
            get: (id) =>
                this.get({
                    endpoint: "eholdings/ebsco/titles/" + id,
                    headers: {
                        "x-koha-embed": "resources,resources.package",
                    },
                }),
            getAll: (query) =>
                this.get({
                    endpoint:
                        "eholdings/local/ebsco/titles" + (query || "_per_page=-1"),
                }),
        };
    }

    get EBSCOResources() {
        return {
            get: (id) =>
                this.get({
                    endpoint: "eholdings/ebsco/resources/" + id,
                    headers: {
                        "x-koha-embed": "title,package,vendor",
                    },
                }),
        };
    }
}

export default ERMAPIClient;