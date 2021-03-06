/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { User } from '../model/user';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UserControllerService {

    protected basePath = 'https://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * getCurrentUser
     * 
     * @param accountNonExpired 
     * @param accountNonLocked 
     * @param attributes 
     * @param authorities0Authority 
     * @param credentialsNonExpired 
     * @param email 
     * @param enabled 
     * @param id 
     * @param name 
     * @param password 
     * @param username 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCurrentUserUsingGET(accountNonExpired?: boolean, accountNonLocked?: boolean, attributes?: { [key: string]: string; }, authorities0Authority?: string, credentialsNonExpired?: boolean, email?: string, enabled?: boolean, id?: string, name?: string, password?: string, username?: string, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public getCurrentUserUsingGET(accountNonExpired?: boolean, accountNonLocked?: boolean, attributes?: { [key: string]: string; }, authorities0Authority?: string, credentialsNonExpired?: boolean, email?: string, enabled?: boolean, id?: string, name?: string, password?: string, username?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public getCurrentUserUsingGET(accountNonExpired?: boolean, accountNonLocked?: boolean, attributes?: { [key: string]: string; }, authorities0Authority?: string, credentialsNonExpired?: boolean, email?: string, enabled?: boolean, id?: string, name?: string, password?: string, username?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public getCurrentUserUsingGET(accountNonExpired?: boolean, accountNonLocked?: boolean, attributes?: { [key: string]: string; }, authorities0Authority?: string, credentialsNonExpired?: boolean, email?: string, enabled?: boolean, id?: string, name?: string, password?: string, username?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {












        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (accountNonExpired !== undefined && accountNonExpired !== null) {
            queryParameters = queryParameters.set('accountNonExpired', <any>accountNonExpired);
        }
        if (accountNonLocked !== undefined && accountNonLocked !== null) {
            queryParameters = queryParameters.set('accountNonLocked', <any>accountNonLocked);
        }
        if (attributes !== undefined && attributes !== null) {
            queryParameters = queryParameters.set('attributes', <any>attributes);
        }
        if (authorities0Authority !== undefined && authorities0Authority !== null) {
            queryParameters = queryParameters.set('authorities[0].authority', <any>authorities0Authority);
        }
        if (credentialsNonExpired !== undefined && credentialsNonExpired !== null) {
            queryParameters = queryParameters.set('credentialsNonExpired', <any>credentialsNonExpired);
        }
        if (email !== undefined && email !== null) {
            queryParameters = queryParameters.set('email', <any>email);
        }
        if (enabled !== undefined && enabled !== null) {
            queryParameters = queryParameters.set('enabled', <any>enabled);
        }
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (password !== undefined && password !== null) {
            queryParameters = queryParameters.set('password', <any>password);
        }
        if (username !== undefined && username !== null) {
            queryParameters = queryParameters.set('username', <any>username);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<User>(`${this.basePath}/user/me`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
